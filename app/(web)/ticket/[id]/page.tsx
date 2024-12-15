import { getBooking,  } from '@/actions/booking.actions'; 
import { TiTickOutline } from "react-icons/ti";
import { FaBus } from "react-icons/fa";
const page = async( {params}:any) => {  
const { id } = await params  
const busDetails = await getBooking(Number(id)); 
  return (
    <div className=' w-full h-full flex items-center text-gray-500 pt-10 justify-center'>
       <div className='buttonbg  w-5/6 bg-indigo-50 h-fit  pb-8 !rounded-xl overflow-hidden'>
       <p className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-5 py-3 flex justify-between text-white px-3 bgbase w-full text-2xl font-bold '>{busDetails?.bus?.busName} <span>(Bus No.) {busDetails?.bus?.busNumber}</span></p>
       <div className='max-md:px-2  px-6'>
       <p className='  mt-2 '>Ticked Booked on : <span className=' text-[#ffffff] font-semibold '>  {busDetails?.createdAt?.toLocaleString()} </span> </p>
       <div className=' border-y-2 mt-5 border-dashed border-[#ffffff9a] flex justify-between items-center'>
         <div className=' flex flex-col gap-2 my-5 '>   
         <h1 className=' text-gray-400'>Name of passenger <span className='text-[#ffffff] font-semibold '>  {busDetails?.user?.firstName } {busDetails?.user?.lastName }</span> </h1>
          <p className=' text-gray-400'>PickUp location: <span  className='text-[#ffffff] font-semibold '>{busDetails?.bus?.route?.startPoint}</span></p>
          <p className=' text-gray-400'>Seat booked  {busDetails?.bus.seats.map((seat) => (
           <span key={seat.id}  className='text-[#ffffff] font-semibold ' >
             {seat.seatNumber} , 
           </span>
         ))}</p>         
         </div> 
         <div>
           <p className=' text-3xl '>Total price</p>
           <p className=' text-4xl font-bold text-[#ffffff] '>₹ {busDetails?.bus?.price}</p>
           <p className='flex items-center gap-2 border-2 border-[#43eb43] bg-[#34c034bd] px-2 py-1 font-bold rounded-3xl text-[#05ff05]'><TiTickOutline />Bill Paid</p>
         </div>
       </div>
       <div className='mt-5  max-md:text-sm flex justify-between items-center'>    
         <div className=' flex gap-2'>        <p>{busDetails?.bus?.route?.startPoint}</p>
         -----&gt; <FaBus /> -----&gt;
       <p>{busDetails?.bus?.route?.endPoint}</p></div>
       <p>Departure at {busDetails?.bus?.startingTime.toLocaleDateString()}</p>
       <p>Arrive at  {busDetails?.bus?.endingTime.toLocaleDateString()}</p>
       </div>
       </div>
       </div> 
    </div>
  )
}

export default page
