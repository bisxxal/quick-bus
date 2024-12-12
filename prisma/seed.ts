// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const routes = [
//   { startPoint: 'Mumbai', endPoint: 'Pune' },
//   { startPoint: 'Delhi', endPoint: 'Agra' },
//   { startPoint: 'Chennai', endPoint: 'Bangalore' },
//   { startPoint: 'Kolkata', endPoint: 'Siliguri' },
//   { startPoint: 'Hyderabad', endPoint: 'Warangal' },
//   { startPoint: 'Jaipur', endPoint: 'Udaipur' },
//   { startPoint: 'Ahmedabad', endPoint: 'Surat' },
//   { startPoint: 'Bhopal', endPoint: 'Indore' },
//   { startPoint: 'Kochi', endPoint: 'Trivandrum' },
//   { startPoint: 'Lucknow', endPoint: 'Kanpur' },
//   { startPoint: 'Goa', endPoint: 'Mangalore' },
//   { startPoint: 'Chandigarh', endPoint: 'Shimla' },
//   { startPoint: 'Patna', endPoint: 'Rajgir' },
//   { startPoint: 'Nagpur', endPoint: 'Jabalpur' },
//   { startPoint: 'Ranchi', endPoint: 'Dhanbad' },
//   { startPoint: 'Varanasi', endPoint: 'Allahabad' },
//   { startPoint: 'Bhubaneswar', endPoint: 'Cuttack' },
//   { startPoint: 'Pune', endPoint: 'Nashik' },
//   { startPoint: 'Madurai', endPoint: 'Trichy' },
//   { startPoint: 'Surat', endPoint: 'Vadodara' },
// ];

// const createBuses = async () => {
//   try {
//     // Create Routes
//     const createdRoutes = await Promise.all(
//       routes.map(route => prisma.route.create({
//         data: {
//           startPoint: route.startPoint,
//           endPoint: route.endPoint,
//         }
//       }))
//     );

//     // Create Buses for each Route
//     const buses = [];
//     for (const route of createdRoutes) {
//       for (let i = 0; i < 2; i++) { // Create 2 buses per route
//         buses.push(prisma.bus.create({
//           data: {
//             busNumber: `BUS-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
//             capacity: 10, // Random capacity between 35-50
//             routeId: route.id,
//             seats: {
//               create: Array.from({ length: 10 }).map((_, idx) => ({
//                 seatNumber: `A${idx + 1}`,
//               })),
//             },
//           }
//         }));
//       }
//     }
 
//     await Promise.all(buses);

//     console.log('Successfully created 20 buses and routes.');
//   } catch (error) {
//     console.error('Error creating buses and routes:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// createBuses();




import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Step 1: Create Routes with Indian cities
  const route1 = await prisma.route.create({
    data: {
      startPoint: 'Delhi',
      endPoint: 'Mumbai',
    },
  });

  const route2 = await prisma.route.create({
    data: {
      startPoint: 'Bangalore',
      endPoint: 'Chennai',
    },
  });

  const route3 = await prisma.route.create({
    data: {
      startPoint: 'Kolkata',
      endPoint: 'Hyderabad',
    },
  });

  const route4 = await prisma.route.create({
    data: {
      startPoint: 'Jaipur',
      endPoint: 'Lucknow',
    },
  });

  console.log('Routes created:', { route1, route2, route3, route4 });

  // Step 2: Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'alice.jones@example.com',
      firstName: 'Alice',
      lastName: 'Jones',
    },
  });

  console.log('Users created:', { user1, user2, user3 });

  // Step 3: Create Buses and ensure each bus has more than 10 seats
  const bus1 = await prisma.bus.create({
    data: {
      busNumber: 'Delhi-Mumbai-01',
      capacity: 15, // More than 10 seats
      price: 50.0,
      routeId: route1.id, // Assign the route created earlier
    },
  });

  const bus2 = await prisma.bus.create({
    data: {
      busNumber: 'Bangalore-Chennai-01',
      capacity: 12, // More than 10 seats
      price: 40.0,
      routeId: route2.id, // Assign the route created earlier
    },
  });

  const bus3 = await prisma.bus.create({
    data: {
      busNumber: 'Kolkata-Hyderabad-01',
      capacity: 20, // More than 10 seats
      price: 55.0,
      routeId: route3.id, // Assign the route created earlier
    },
  });

  const bus4 = await prisma.bus.create({
    data: {
      busNumber: 'Jaipur-Lucknow-01',
      capacity: 18, // More than 10 seats
      price: 45.0,
      routeId: route4.id, // Assign the route created earlier
    },
  });

  console.log('Buses created:', { bus1, bus2, bus3, bus4 });

  // Step 4: Create Seats for each bus (ensure each bus has more than 10 seats)
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

  console.log('Seats created for Bus 1, Bus 2, Bus 3, and Bus 4.');

  // Step 5: Create Bookings and associate seats
  const booking1 = await prisma.booking.create({
    data: {
      userId: user1.id, // Associate with User 1
      busId: bus1.id, // Associate with Bus 1
      bookingDate: new Date(),
      status: 'CONFIRMED',
      seatsBooked: 2, // Number of seats booked
      ticketCode: `BOOKING-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, // Unique ticket code
      seatNumber: {
        connect: [
          { id: 1 }, // Seat 1
          { id: 2 }, // Seat 2
        ],
      },
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      userId: user2.id, // Associate with User 2
      busId: bus2.id, // Associate with Bus 2
      bookingDate: new Date(),
      status: 'CONFIRMED',
      seatsBooked: 3, // Number of seats booked
      ticketCode: `BOOKING-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, // Unique ticket code
      seatNumber: {
        connect: [
          { id: 3 }, // Seat 3
          { id: 4 }, // Seat 4
          { id: 5 }, // Seat 5
        ],
      },
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      userId: user3.id, // Associate with User 3
      busId: bus3.id, // Associate with Bus 3
      bookingDate: new Date(),
      status: 'CONFIRMED',
      seatsBooked: 4, // Number of seats booked
      ticketCode: `BOOKING-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, // Unique ticket code
      seatNumber: {
        connect: [
          { id: 6 }, // Seat 6
          { id: 7 }, // Seat 7
          { id: 8 }, // Seat 8
          { id: 9 }, // Seat 9
        ],
      },
    },
  });

  console.log('Bookings created:', { booking1, booking2, booking3 });

  // Step 6: Mark seats as booked
  await prisma.seat.updateMany({
    where: {
      id: { in: [1, 2] }, // Seats for Booking 1
    },
    data: {
      isBooked: true,
      bookingId: booking1.id, // Associate seats with booking
    },
  });

  await prisma.seat.updateMany({
    where: {
      id: { in: [3, 4, 5] }, // Seats for Booking 2
    },
    data: {
      isBooked: true,
      bookingId: booking2.id, // Associate seats with booking
    },
  });

  await prisma.seat.updateMany({
    where: {
      id: { in: [6, 7, 8, 9] }, // Seats for Booking 3
    },
    data: {
      isBooked: true,
      bookingId: booking3.id, // Associate seats with booking
    },
  });

  console.log('Seats updated to booked.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
