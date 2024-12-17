'use client';
import { getUser, profileBooking } from '@/actions/user.actions'
import { convertUTCToLocal } from '@/lib/utils'; 
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
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
const ProfilePage = () => {
  let user = useUser();
  const id = user?.user?.publicMetadata.userId;
  const name = user.user?.firstName;
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Props[]>([]);
  useEffect(()=>{
     setLoading(true)
    const bokfun = async()=>{
      if (!user) { return;}
        const bookings:Props[] = await profileBooking(id as number);
        setBookings(bookings)
        setLoading(false)
     }
      bokfun()
  },[])
  return (
    <div> 
      <div className=' w-5/6 mx-auto mt-5'>
       { name && <p className=' text-center text-lg'>Wellcome , <span className=' font-bold textbase'>{name} 👋🏻</span></p>}
         { bookings.length !== 0 && <p>Your Tickets : {bookings.length}</p>}
         { bookings.length === 0  && !loading && <p className=' text-center mt-10 max-md:text-base text-xl font-semibold'>No tickets are booked</p>}
        <div className='mt-8 flex max-md:justify-center items-center gap-7 flex-wrap overflow-hidden '>
        {
           bookings ? bookings?.map((book:Props , index:number)=>{
            return(
                <div key={index} className=' buttonbg !rounded-3xl h-80 !w-80 flex flex-col items-center '>
                    <h1 className=' text-center   my-5'>BUS Name : <span className=' text-2xl font-bold'>{book.bus.busName}</span></h1>
                    <p>Bus Number: {book?.bus.busNumber}</p>
                    <p>Booked on: {convertUTCToLocal(book?.bookingDate)}</p>
                    <p>Total seat booked: {book.seatsBooked}</p>
                    <p>starting point: {book.bus.route.startPoint}</p>
                    <p>ending point:  {book.bus.route.endPoint}</p>
                    <p>Seats No {book.seatNumber.map((s)=> s.seatNumber).join(', ')}</p>
            </div>
                )
            }):
            <p className=' text-center text-lg '>No Bookings yet</p>
        }
        </div>
         {
            loading && (  <div className='w-full h-96 flex items-center justify-center'>
              <FiLoader className=" text-2xl animate-spin" />
            </div>)
          }
      </div>
    </div>
  )
}
export default ProfilePage