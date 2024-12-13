'use server'
import prisma from "@/lib/prisma";
import { handelError } from "@/lib/utils/error"; 

export const addBus = async (busName:string , busNumber: string, capacity: number ,  startingTime:Date ,endingTime:Date , price:number , startPoint:string , endPoint:string) => {
    try {
        const bus = await prisma.bus.create({
            data: {
                busNumber,
                capacity,
                busName,
                startingTime,
                endingTime, 
                route:{
                    create:{
                        startPoint: startPoint,
                        endPoint: endPoint,
                    }
                },
                price,
            }
        });
         
        return JSON.parse(JSON.stringify({status:200 , busId:bus.id}));
    } catch (error) { 
        handelError(error , "addBus Error");
    }

}

export const UpdateBus = async ( busId:number, routeId:number , busNumber: string,busName:string, capacity: number ,  startingTime:Date ,endingTime:Date , price:number , startPoint:string , endPoint:string) => {
    try {
        const bus = await prisma.bus.update({
            where: {
                id: busId,
                routeId:routeId
            },
            data: {
                busNumber,
                busName,
                capacity,
                startingTime,
                endingTime, 
                route:{
                    update:{
                        startPoint: startPoint,
                        endPoint: endPoint,
                    }
                },
                price,
            }
        });
        return JSON.parse(JSON.stringify({status:200}));
    } catch (error) { 
        handelError(error , "ScheduleBus Error");
    }

}
export const featchBus = async (busId: number) => {
    try {
        const bus = await prisma.bus.findUnique({
            where: {
                id: busId
            },
            select:{
                id:true,
                busNumber:true,
                busName :true,
                capacity:true,
                startingTime:true,
                endingTime:true,
                price:true,
            seats:{
                select:{
                    id:true,
                    seatNumber:true,
                },

            },
                route:{
                    select:{
                        startPoint:true,
                        endPoint:true,
                        id:true
                    }
                }
            }
        });
       
        return JSON.parse(JSON.stringify(bus));
    } catch (error) {
        handelError(error , "featchBus Error");     
    }
}

export async function seatCreate(seatnames: string[], busId: number) {
    try {
      
      const createdSeats = await prisma.seat.createMany({
        data: seatnames.map((seatName: string) => ({
          seatNumber: seatName,
          busId: busId,
        })),
      });
      return JSON.parse(JSON.stringify({status:200}));
    } catch (error) { 
      handelError (error , 'error when creating seat')
    }
  }