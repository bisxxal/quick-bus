'use server'
import prisma from "@/lib/prisma";
import { handelError } from "@/lib/utils/error"; 
import { getUser } from "./user.actions"; 
import { redis } from "@/lib/redis";

export const fetchDirection = async () => {
  try {
    const chacheddata = await redis.get('direction');
    if (chacheddata) {
      const dirs:any = JSON.parse(chacheddata);
      const uniquePoints = new Set();
      const uniqueRoutes = dirs.filter((route: any) => {
        const pointsKey = `${route.startPoint}-${route.endPoint}`;
        if (!uniquePoints.has(pointsKey)) {
          uniquePoints.add(pointsKey);
          return true;  
        }
        return false;    
      });  
      return JSON.parse(JSON.stringify(uniqueRoutes));
    }
      const dir = await prisma.route.findMany({
          select: {
              id: true,
              startPoint: true,
              endPoint: true, 
          }
      });
      const uniquePoints = new Set();
      const uniqueRoutes = dir.filter(route => {
          const pointsKey = `${route.startPoint}-${route.endPoint}`;

          if (!uniquePoints.has(pointsKey)) {
              uniquePoints.add(pointsKey);
              return true;  
          }
          return false;   
      });
      await redis.set('direction', JSON.stringify(uniqueRoutes), 'EX', 6000);
      return JSON.parse(JSON.stringify(uniqueRoutes));
  } catch (error) {
      handelError(error, 'fetchDirection');
  }
};


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
                        busName : true,
                        seats:{
                            where:{
                                isBooked: false
                            },
                            select:{ 
                                isBooked: true,
                            }
                        }
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
   
      const availableSeats = bus.seats
      .filter(seat => seat && seat.seatNumber) 
      .map(seat => ({
        id: seat.id,
        seatNumber: seat.seatNumber,  
        isBooked: seat.isBooked,      
      }))
      .sort((a, b) => a.seatNumber.localeCompare(b.seatNumber)); 
      return {
        bus,
        availableSeats,
      };
    } catch (error) {
      handelError(error, 'getBusDetails');
    
    }
  } 
export async function bookSeat({busId,seatIds,paymentId,}: {busId: number;seatIds: number[];paymentId: number;}) {
  try { 
    const user = await getUser();
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        busId: busId,
        bookingDate: new Date(),
        status: 'CONFIRMED',   
        seatsBooked: seatIds.length, 
        paymentId
      },
    });
 
    await prisma.seat.updateMany({
      where: {
        id: { in: seatIds },
      },
      data: {
        isBooked: true,
        bookingId: booking.id,  
      },
    });
 
    const updatedSeats = await prisma.seat.findMany({
      where: {
        id: { in: seatIds },
      },
    }); 

    console.log('updatedSeats', updatedSeats);
    
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
    handelError(error, 'bookSeat');
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
