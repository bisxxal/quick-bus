
// const page = ({params}:any) => {
//   return (
//     <div>
//       {params.id}
//     </div>
//   )
// }

// export default page

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { bookSeats, getBusDetails } from '@/actions/booking.actions';

interface Seat {
  seatNumber: number;
  isBooked: boolean;
}

interface BusDetails {
  busId: number;
  totalSeats: number;
  availableSeats: number;
  bookedSeats: number[];
}

const SeatBookingPage = ({ params }: { params: any }) => {
  const [busDetails, setBusDetails] = useState<BusDetails | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());
  const router = useRouter();
 

const p = useParams()
  
  useEffect(() => {
     
    const fetchBusDetails = async () => {
        const id = parseInt(p.id);
        const data = await getBusDetails(id);
      setBusDetails(data);
    };

    fetchBusDetails();
  }, []);

//   console.log("busDetails",busDetails);
  
   

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeats((prev) => {
      const newSelectedSeats = new Set(prev);
      if (newSelectedSeats.has(seatNumber)) {
        newSelectedSeats.delete(seatNumber);
      } else {
        newSelectedSeats.add(seatNumber);
      }
      return newSelectedSeats;
    });
  };

  const handleSubmit = async () => {
    if (!busDetails || selectedSeats.size === 0) return;
 

    // const result = await bookSeats({
    //     busId: busDetails.busId,
    //     seatsBooked: selectedSeats.size,
    //     userId: 15,  
    // })
    // console.log("booked in client",result);
    
  };

  if (!busDetails) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Bus Seat Booking</h1>
      <p>
        {/* Route: {busDetails?.route?.startPoint} to {busDetails.route.endPoint} */}
      </p>
      <p>Total Seats: {busDetails.totalSeats}</p>
      <p>Available Seats: {busDetails.availableSeats}</p>

      <div className="grid grid-cols-10 gap-2 mt-4">
        {[...Array(busDetails?.totalSeats)]?.map((_, idx) => {
          const seatNumber = idx + 1;
          const isBooked = busDetails?.bookedSeats?.includes(seatNumber);
          const isSelected = selectedSeats?.has(seatNumber);
          return (
            <button
              key={seatNumber}
              onClick={() => !isBooked && handleSeatClick(seatNumber)}
              disabled={isBooked}
              className={`p-2 rounded ${
                isBooked
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isSelected
                  ? 'bg-blue-500'
                  : 'bg-green-500'
              }`}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white p-2 rounded"
      >
        Book Selected Seats
      </button>
    </div>
  );
};

export default SeatBookingPage;
