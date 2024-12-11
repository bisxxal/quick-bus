'use server'
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { BookingStatus } from "@prisma/client";
// export const createBooking = async (booking:any) => {
//    const user = await currentUser()

//     try {
//         const booked  = await prisma.booking.create({
//             data: {
//                 ...booking,
//                 user: {
//                     connect: {
//                         id: user.id!
//                     }
//                 }
//             }

//         })
//     } catch (error) {
        
//     }

// }

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
                            gte: startOfDay,  // Greater than or equal to start of the day
                            lte: endOfDay     // Less than or equal to end of the day
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
                    }
                }
            }
        });

        return JSON.parse(JSON.stringify(bus));
    } catch (error) {
        console.log(error);
    }
}
////------------============
export async function getBusDetails(busId: number) {
    try {
        const bus = await prisma.bus.findUnique({
          where: { id: busId },
          include: {
            route: true,
            bookings: true,
          },
        });
      
        if (!bus) {
          throw new Error("Bus not found");
        }
      
        const totalSeats = bus.capacity;
        const bookedSeats = bus.bookings.reduce((total, booking) => total + booking.seatsBooked, 0);
      
        return {
          bus,
          availableSeats: totalSeats - bookedSeats,
        };
    } catch (error) {
        console.log(`An error occurred while fetching bus details: ${error}`);
        // throw new Error(error.message || "An error occurred while fetching bus details.");
        
    }
  }
  
interface BookingData {
  busId: number;
  seatsBooked: number;
  userId: number;
}

export async function bookSeats(bookingData: BookingData) {
  try {
    // Fetch the bus information and its available capacity
    const bus = await prisma.bus.findUnique({
      where: { id: bookingData.busId },
      include: { bookings: true },
    });

    if (!bus) {
      throw new Error("Bus not found");
    }

    const totalSeats = bus.capacity;
    const bookedSeats = bus.bookings.reduce((total, booking) => total + booking.seatsBooked, 0);

    if (bookedSeats + bookingData.seatsBooked > totalSeats) {
      throw new Error("Not enough seats available");
    }

    // Create a booking
    const newBooking = await prisma.booking.create({
      data: {
        userId: bookingData.userId,
        busId: bookingData.busId,
        bookingDate: new Date(),
        status: BookingStatus.CONFIRMED,
        seatsBooked: bookingData.seatsBooked,
      },
    });

    return newBooking;

  } catch (error) {
    console.log(`An error occurred while booking seats: ${error}`);
    
    // throw new Error(error.message || "An error occurred while booking seats.");
  }
}
