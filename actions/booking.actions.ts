'use server'
import prisma from "@/lib/prisma";
import { handelError } from "@/lib/utils/error";
import { currentUser } from "@clerk/nextjs/server";
import { BookingStatus } from "@prisma/client";
  
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
////------------============
  
export async function getBusDetails(busId: number) {
    try {
      // Fetch the bus with its seats and route details
      const bus = await prisma.bus.findUnique({
        where: { id: busId },
        include: {
          seats: true,  // Include associated seats
          route: true,  // Include route details
        },
      });
   
      if (!bus) {
        throw new Error('Bus not found');
      }
  
      // Filter available seats (seats that are not booked)
      const availableSeats = bus.seats.filter(seat => seat);
  
    //   console.log('Bus details:', av);
      
      return {
        bus,
        availableSeats,
      };
    } catch (error) {
    //   console.error('Error fetching bus details:', error);
    //   throw new Error('Failed to fetch bus details');
    console.log(`An error occurred while fetching bus details: ${error}`);
    
    }
  }
  
interface BookingData {
  busId: number;
  seatsBooked: number;
  userId: number;
}
 
// export async function bookSeat({userId ,busId, seatIds}: {userId: number, busId: number, seatIds: number[]}) {
//   try {
//     const seats = await prisma.seat.findMany({
//       where: {
//         id: { in: seatIds },
//         busId: busId,  
//         isBooked: false,  
//       },
//     });

//       if (seats.length !== seatIds.length) { 
//     console.log('Some selected seats are already booked.');
//     }
 
//     // await prisma.seat.updateMany({
//     //   where: {
//     //     id: { in: seatIds },
//     //   },
//     //   data: {
//     //     isBooked: true,
//     //   },
//     // });

//     const ticketData = seats.map((seat, idx) => ({
//       seatNumber: seat.seatNumber, 
//       ticketCode: `TICKET-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 
//       price: 50.0, 
//       bookingId: undefined, // Add bookingId to match the expected type
//     }));
 
//     const booking = await prisma.booking.create({
//       data: {
//         userId: userId,
//         busId: busId,
//         bookingDate: new Date(),
//         status: 'CONFIRMED', 
//         seatsBooked: seatIds.length, 
//       },
//     });

     
//     if (booking && booking.id) {
//       // Now, create the ticket data with the correct bookingId
//       // const ticketData = seats.map((seat) => ({
//       //   seatNumber: seat.seatNumber, 
//       //   ticketCode: `TICKET-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 
//       //   price: 50.0, 
//       //   bookingId: booking.id,  // Ensure the bookingId is passed here
//       // }));

//       // Create tickets in bulk and associate with the booking
//       // const tickets = await prisma.ticket.createMany({
//       //   data: ticketData,  // This will insert the tickets with the correct bookingId
//       // });


//       await Promise.all(
//         seats.map(async (seat) => {
//           await prisma.ticket.create({
//             data: {
//               seatNumber: seat.seatNumber, 
//               ticketCode: `TICKET-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 
//               price: 50.0, 
//               bookingId: booking.id, 
//             }
//           });
//         })
//       );


//       console.log('Tickets created:');
//     }

 
//     console.log('Booking result:', { booking });
    
//     return { booking };
//   } catch (error) {
//     // Check if the error is an object and log it
//     if (error instanceof Error) {
//       console.log('Error booking seats:', error.message);
//       console.log('Stack trace:', error.stack);
//     } else {
//       console.log('Unexpected error:', error); // Fallback for non-standard errors
//     } 
//   }
// }

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
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                bus: {
                    select: {
                        busNumber: true,
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
