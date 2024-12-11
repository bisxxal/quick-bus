import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const routes = [
  { startPoint: 'Mumbai', endPoint: 'Pune' },
  { startPoint: 'Delhi', endPoint: 'Agra' },
  { startPoint: 'Chennai', endPoint: 'Bangalore' },
  { startPoint: 'Kolkata', endPoint: 'Siliguri' },
  { startPoint: 'Hyderabad', endPoint: 'Warangal' },
  { startPoint: 'Jaipur', endPoint: 'Udaipur' },
  { startPoint: 'Ahmedabad', endPoint: 'Surat' },
  { startPoint: 'Bhopal', endPoint: 'Indore' },
  { startPoint: 'Kochi', endPoint: 'Trivandrum' },
  { startPoint: 'Lucknow', endPoint: 'Kanpur' },
  { startPoint: 'Goa', endPoint: 'Mangalore' },
  { startPoint: 'Chandigarh', endPoint: 'Shimla' },
  { startPoint: 'Patna', endPoint: 'Rajgir' },
  { startPoint: 'Nagpur', endPoint: 'Jabalpur' },
  { startPoint: 'Ranchi', endPoint: 'Dhanbad' },
  { startPoint: 'Varanasi', endPoint: 'Allahabad' },
  { startPoint: 'Bhubaneswar', endPoint: 'Cuttack' },
  { startPoint: 'Pune', endPoint: 'Nashik' },
  { startPoint: 'Madurai', endPoint: 'Trichy' },
  { startPoint: 'Surat', endPoint: 'Vadodara' },
];

const createBuses = async () => {
  try {
    // Create Routes
    const createdRoutes = await Promise.all(
      routes.map(route => prisma.route.create({
        data: {
          startPoint: route.startPoint,
          endPoint: route.endPoint,
        }
      }))
    );

    // Create Buses for each Route
    const buses = [];
    for (const route of createdRoutes) {
      for (let i = 0; i < 2; i++) { // Create 2 buses per route
        buses.push(prisma.bus.create({
          data: {
            busNumber: `BUS-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            capacity: Math.floor(Math.random() * (50 - 35 + 1) + 35), // Random capacity between 35-50
            routeId: route.id,
            
          }
        }));
      }
    }

    // Create all buses
    await Promise.all(buses);

    console.log('Successfully created 20 buses and routes.');
  } catch (error) {
    console.error('Error creating buses and routes:', error);
  } finally {
    await prisma.$disconnect();
  }
};

createBuses();
