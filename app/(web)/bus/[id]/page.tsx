 
import { getBusDetails } from '@/actions/booking.actions'
import { getUser } from '@/actions/user.actions'
import BookingPage from '@/components/custom/BookingPage'
import React from 'react'

const page = async( {params}:any) => { 
  const { id } = await params 
  const user = await getUser();
  const busDetails = await getBusDetails(Number(id));
  
  return (
    <div className=' w-full '>
       <BookingPage user={user} busDetails={busDetails} />
    </div>
  )
}

export default page
