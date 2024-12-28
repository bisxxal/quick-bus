'use server'
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
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
          await prisma.bus.update({
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
         const cachevalue = await redis.get(`bus:${busId}`);
            if (cachevalue) {
              return JSON.parse(cachevalue)
            }

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
        console.log('from db');
        await redis.set(`bus:${bus?.id}`, JSON.stringify(bus) , 'EX', 6000)
        return JSON.parse(JSON.stringify(bus));
    } catch (error) {
        handelError(error , "featchBus Error");     
    }
}

export async function seatCreate(seatnames: string[], busId: number) {
    try {
      
      await prisma.seat.createMany({
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

export const SearchBus = async (busname:string) => {
    try {
        const bus = await prisma.bus.findMany({
            where: {
                busName: {
                    contains: busname
                }
            },
            select:{
                id:true,
            }
        });
        return JSON.parse(JSON.stringify({bus:bus[0].id}));
         
    } catch (error) {
        handelError(error , "SearchBus Error");
    }
}

export default async function getBusSuggetion( query:string) {
  
    if (!query || typeof query !== "string") {
      return { message: "Query parameter is required" };
         }

    try {
      const buses = await prisma.bus.findMany({
        where: {
          OR:[
            {
              busNumber: {
                contains: query,     
                mode: "insensitive"  
              }
            },
            {
              busName: {
                contains: query,      
                mode: "insensitive"   
              }
            }
          ] 
        },
        select: {
          busName: true,  
          busNumber: true,
          id:true
        }
      });
  
      return JSON.parse(JSON.stringify(buses));
    } catch (error) { 
      handelError (error , 'error when getting user');
    }
  }  
 

  export const SearchBusId = async (id:number) => {
    try {
        const bus = await prisma.bus.findMany({
            where: {
                id
            },
            select:{
                id:true,
            }
        }); 
        return JSON.parse(JSON.stringify({bus:bus[0].id}));
         
    } catch (error) {
        handelError(error , "SearchBus Error");
    }
}
