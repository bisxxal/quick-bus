import { getBooking,  } from '@/actions/booking.actions'; 
import { TiTickOutline } from "react-icons/ti";
import { FaBus } from "react-icons/fa";
const page = async( {params}:any) => {  
const { id } = await params  
const busDetails = await getBooking(Number(id)); 
  return (
    <div className=' w-full h-full flex items-center text-gray-500 pt-10 justify-center'>
      
       <div className=' w-5/6 bg-indigo-50 h-fit  pb-8 rounded-xl overflow-hidden'>
       

       <p className=' bg-red-600 mb-5 py-3 flex justify-between text-white px-3 bgbase w-full text-2xl font-bold '>{busDetails?.bus?.busName} <span>(Bus No.) {busDetails?.bus?.busNumber}</span></p>
       <div className=' px-6'>
       
       <p className='  mt-2 '>Ticked Booked on : <span className=' text-[#000000c5] font-medium '>  {busDetails?.createdAt?.toLocaleString()} </span> </p>

       <div className=' border-y-2 mt-5 border-dashed border-[#0000004e] flex justify-between items-center'>
         <div className=' flex flex-col gap-2 my-5 '>   
         <h1 >Name of passenger <span className='text-[#000000c5] font-medium '>  {busDetails?.user?.firstName } {busDetails?.user?.lastName }</span> </h1>
         <p>PickUp location: <span  className='text-[#000000c5] font-medium '>{busDetails?.bus?.route?.startPoint}</span></p>
         <p>Seat booked  {busDetails?.bus.seats.map((seat) => (
           <span key={seat.id}  className='text-[#000000c5] font-medium ' >
             {seat.seatNumber} , 
           </span>
         ))}</p>
         
         </div> 
         <div>
           <p className=' text-3xl '>Total price</p>
           <p className=' text-4xl font-bold text-[#000000c5] '>₹ {busDetails?.bus?.price}</p>
           <p className='flex items-center gap-2 border-2 border-[#43eb43] bg-[#34c034bd] px-2 py-1 font-bold rounded-3xl text-[#05ff05]'><TiTickOutline />Bill Paid</p>
           
         </div>

       </div>

       <div className='mt-5  flex justify-between items-center'>    
         <div className=' flex gap-2'>        <p>{busDetails?.bus?.route?.startPoint}</p>
         -----&gt; <FaBus /> -----&gt;
       <p>{busDetails?.bus?.route?.endPoint}</p></div>

       <p>Arrive at {busDetails?.bus?.startingTime.toLocaleDateString()}</p>
       <p>Departure at {busDetails?.bus?.endingTime.toLocaleDateString()}</p>
       </div>
       </div>
         
        
     
       </div> 
    </div>
  )
}

export default page
