import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() { 
  
  const route1 = await prisma.route.create({
    data: {
      startPoint: 'delhi',
      endPoint: 'mumbai',
    },
  });

  const route2 = await prisma.route.create({
    data: {
      startPoint: 'bangalore',
      endPoint: 'chennai',
    },
  });

  const route3 = await prisma.route.create({
    data: {
      startPoint: 'kolkata',
      endPoint: 'hyderabad',
    },
  });

  const route4 = await prisma.route.create({
    data: {
      startPoint: 'jaipur',
      endPoint: 'lucknow',
    },
  });   
  const bus1 = await prisma.bus.create({
    data: {
      busNumber: 'DL-01',
      busName: 'Delhi-Mumbai-02',
      capacity: 15,  
      price: 50.0,
      routeId: route1.id,
      startingTime:new Date(  '2024-12-12T08:00:00Z'), 
      endingTime: new Date('2024-12-13T08:00:00Z'),
    },
  });

  const bus2 = await prisma.bus.create({
    data: {
      busNumber: 'DL-02',
      busName: 'Bangalore-Chennai-02',
      capacity: 12,  
      price: 40.0,
      routeId: route2.id,
      startingTime:new Date(  '2024-12-12T08:00:00Z'), 
      endingTime: new Date('2024-12-13T08:00:00Z'),
    },
  });

  const bus3 = await prisma.bus.create({
    data: {
      busNumber: 'DL-03',
      busName: 'Kolkata-Hyderabad-02',
      capacity: 20,  
      price: 55.0,
      routeId: route3.id,
      startingTime:new Date(  '2024-12-12T08:00:00Z'), 
      endingTime: new Date('2024-12-13T08:00:00Z'),
    },
  });

  const bus4 = await prisma.bus.create({
    data: {
      busNumber: 'DL-04',
      busName: 'Jaipur-Lucknow-02',
      capacity: 18,  
      price: 45.0,
      routeId: route4.id,
      startingTime:new Date(  '2024-12-12T08:00:00Z'), 
      endingTime: new Date('2024-12-13T08:00:00Z'),
    },
  });

  console.log('Buses created:', { bus1, bus2, bus3, bus4 });
 
  const seatsForBus1 = await prisma.seat.createMany({
    data: Array.from({ length: bus1.capacity }, (_, index) => ({
      seatNumber: `A${index + 1}`, // Seat numbers as A1, A2, A3, ...
      busId: bus1.id,
      isBooked: false,
    })),
  });

  const seatsForBus2 = await prisma.seat.createMany({
    data: Array.from({ length: bus2.capacity }, (_, index) => ({
      seatNumber: `B${index + 1}`, // Seat numbers as B1, B2, B3, ...
      busId: bus2.id,
      isBooked: false,
    })),
  });

  const seatsForBus3 = await prisma.seat.createMany({
    data: Array.from({ length: bus3.capacity }, (_, index) => ({
      seatNumber: `C${index + 1}`, // Seat numbers as C1, C2, C3, ...
      busId: bus3.id,
      isBooked: false,
    })),
  });

  const seatsForBus4 = await prisma.seat.createMany({
    data: Array.from({ length: bus4.capacity }, (_, index) => ({
      seatNumber: `D${index + 1}`, // Seat numbers as D1, D2, D3, ...
      busId: bus4.id,
      isBooked: false,
    })),
  });
 
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
