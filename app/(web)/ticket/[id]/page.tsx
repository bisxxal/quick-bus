'use client';
import { getBooking, getBusDetails } from '@/actions/booking.actions';
import { useParams } from 'next/navigation';
import { log } from 'node:console';
import React, { use, useEffect, useState } from 'react'

const page = () => {
  const p = useParams()
    const [busDetails, setBusDetails] = useState(null);
    const id = parseInt(p.id);

    useEffect(() => {

      const fetchBusDetails = async () => {
          const data = await getBooking(id);
        setBusDetails(data);
      };

      fetchBusDetails();
    }, [p.id]);

console.log(busDetails)
  return (
    <div> 
       <div>
        {/* <h1> {busDetails.user[0].firstname }</h1> */}
        <p>{busDetails?.bus?.busNumber}</p>
        <p>{busDetails?.bus?.route?.startPoint}</p>
        <p>{busDetails?.bus?.route?.endPoint}</p>
        {/* <p>{busDetails?.createdAt  }</p> */}

        <h2>Seats</h2>
        {/* <p>
          {busDetails?.bus.seats.map((seat) => (
            <span key={seat.id} style={{marginRight: 10, color: seat.isBooked ? 'red' : 'green'}}>
              {seat.seatNumber}
            </span>
          ))}

        </p> */}
       </div>
       {
        busDetails?.id
       }
    </div>
  )
}

export default page
