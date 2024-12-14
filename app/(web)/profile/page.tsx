import { profileBooking } from '@/actions/user.actions'
import { convertUTCToLocal } from '@/lib/utils';
import React from 'react'

interface Props {
    id: number;
    busId: number;
    userId: number;
    bookingDate: string;
    seatsBooked: number;
    seatNumber: [ { seatNumber: string }, { seatNumber: string } ],
    createdAt: Date;
    bus: {
      busName: string;
      busNumber: string;
      route: { startPoint: string ; endPoint: string; };
    }

}

const page = async() => {
    const bookings:Props[] = await profileBooking(); 
  return (
    <div> 
      <div className=' w-5/6 mx-auto mt-5'>
          <p className=' text-center text-lg'>Wellcome , <span className=' font-bold textbase'>John Doe 👋🏻</span></p>
          <p>Your Tickets : {bookings.length}</p>
        <div className='mt-8 flex max-md:justify-center items-center gap-7 flex-wrap overflow-hidden '>
        {
           bookings ? bookings?.map((book:Props , index:number)=>{
            return(
                <div key={index} className=' buttonbg !rounded-3xl h-80 !w-80 flex flex-col items-center '>
                    <h1 className=' text-center text-2xl font-bold my-5'>BUS Name : {book.bus.busName}</h1>
                    <p>Bus Number: {book?.bus.busNumber}</p>
                    <p>Booked on: {convertUTCToLocal(book?.bookingDate)}</p>
                    <p>Total seat booked: {book.seatsBooked}</p>
                    <p>starting point: {book.bus.route.startPoint}</p>
                    <p>ending point:  {book.bus.route.endPoint}</p>
                    <p>Seats No {book.seatNumber.map((s)=> s.seatNumber)}</p>
            </div>
                )
            }):
            <p className=' text-center text-lg '>No Bookings yet</p>
        }

        </div>
      </div>
    </div>
  )
}

export default page
