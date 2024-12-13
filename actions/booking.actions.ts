'use server'
import prisma from "@/lib/prisma";
import { handelError } from "@/lib/utils/error";
import { currentUser } from "@clerk/nextjs/server";
import { BookingStatus } from "@prisma/client";
import { getUser } from "./user.actions";
  
export const fetchDirection = async () => {
    try {
        const dir = await prisma.route.findMany({
            select: {
                id: true,
                startPoint: true,
                endPoint:true, 
            }
        })
        // console.log(dir);
        
        return JSON.parse(JSON.stringify(dir))
    } catch (error) {
        console.log(error)
    }
}     
export const SearchBuses = async (to: string, from: string, date: Date) => {
    try { 
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0); 
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);   
        
        const bus = await prisma.route.findMany({
            where: {
                startPoint: from,
                endPoint: to,
                buses: {
                    some: {
                        updatedAt: {
                            gte: startOfDay,  
                            lte: endOfDay     
                        }
                    }
                }
            },
            select: {
                buses: {
                    select: {
                        id: true,
                        busNumber: true,
                        capacity: true,
                        startingTime: true,
                        endingTime: true,
                        price: true,
                    }
                }
            }
        });

        return JSON.parse(JSON.stringify({bus}));
    } catch (error) {
        
        handelError(error, 'SearchBuses');    
    }
}

export async function getBusDetails(busId: number) {
    try { 
      const bus = await prisma.bus.findUnique({
        where: { id: busId },
        include: {
          seats: true,  
          route: true,  
        },
      });
   
      if (!bus) {
        throw new Error('Bus not found');
      }
   
      // const availableSeats = bus.seats.filter(seat => seat);
      const availableSeats = bus.seats
      .filter(seat => seat && seat.seatNumber) // Filter valid seats with a seat number
      .map(seat => ({
        id: seat.id,
        seatNumber: seat.seatNumber,  // Retain seat number
        isBooked: seat.isBooked,      // Include booking status
      }))
      .sort((a, b) => a.seatNumber.localeCompare(b.seatNumber));  // Sort by seatNumber alphabetically


      return {
        bus,
        availableSeats,
      };
    } catch (error) {
      handelError(error, 'getBusDetails');
    
    }
  } 
export async function bookSeat({
  userId,
  busId,
  seatIds,
  paymentId,
}: {
  userId: number;
  busId: number;
  seatIds: number[];
  paymentId: number;
}) {
  try {
    // Step 1: Fetch available seats that are not booked yet
    // const seats = await prisma.seat.findMany({
    //   where: {
    //     id: { in: seatIds },
    //     busId: busId,  // Ensure the seats belong to the given bus
    //     isBooked: false,  // Only get unbooked seats
    //   },
    // });

    // // Step 2: Check if all selected seats are available
    // if (seats.length !== seatIds.length) {
    //   console.log('Some selected seats are already booked or invalid.');
    //   throw new Error('One or more seats are already booked or invalid.');
    // }
 
    const booking = await prisma.booking.create({
      data: {
        userId: userId,
        busId: busId,
        bookingDate: new Date(),
        status: 'CONFIRMED',   
        seatsBooked: seatIds.length, 
        paymentId
      },
    });

    // Step 4: Mark the selected seats as booked and associate them with the booking
    await prisma.seat.updateMany({
      where: {
        id: { in: seatIds },
      },
      data: {
        isBooked: true,
        bookingId: booking.id,  // Associate the seats with the booking
      },
    });

    // Step 5: Return the booking details along with the seat numbers
    const updatedSeats = await prisma.seat.findMany({
      where: {
        id: { in: seatIds },
      },
    });

    console.log('Booking result:', { seats: updatedSeats });

    // Return booking and associated seat details
    return {
      booking,
      seats: updatedSeats.map((seat) => ({
        seatNumber: seat.seatNumber,
        seatId: seat.id,
        busId: seat.busId,
        isBooked: seat.isBooked,
      })),
    };
  } catch (error) {
    // Enhanced error handling
    if (error instanceof Error) {
      console.log('Error booking seats:', error.message);
      console.log('Stack trace:', error.stack);
    } else {
      console.log('Unexpected error:', error);   
    } 
  }
}

export const getBooking = async (bookingId: number) => {

  const user = await getUser();
    try {
      if (!user) { return null; }   
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId , userId: user.id},
        include: {
            bus: {
                select: {
                    busNumber: true,
                    busName: true,
                    price: true,
                    startingTime: true,
                    endingTime: true,
                    route: {
                        select: {
                            startPoint: true,
                            endPoint: true,
                        }
                    },
                    seats:{
                      where:{
                        isBooked: true,
                        bookingId: bookingId
                      },
                        select:{
                          id  : true,
                          isBooked: true, 
                            seatNumber: true,
                            bookingId: true,  
                        }
                    }
                }
            },
          
            user: true, 
        }
    });
        return booking;
    } catch (error) { 
      handelError(error, 'getBooking');
    }
}       
