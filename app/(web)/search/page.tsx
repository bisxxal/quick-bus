'use client'
import { SearchBuses } from '@/actions/booking.actions'
import { convertUTCToLocal } from '@/lib/utils'
import { redirect,useSearchParams } from 'next/navigation'
import { useEffect, useState , Suspense} from 'react'
import { FiLoader } from 'react-icons/fi'
const SearchPage = () => { 
    const [buses, setBuses] = useState([])
    useEffect(()=>{
      const params = new URLSearchParams(window.location.search);
      const form = params.get('from') || '';
      const to = params.get('to') || ''; 
      const dateValue =    params.get('date') as string | null;
      const date = dateValue ? new Date(dateValue) : new Date();
      const featchBusses = async () => { 
        const bus = await SearchBuses(to, form, date) 
        setBuses(bus.bus); 
      }
      featchBusses()
    } , [])
    const handelClicked = (id:string) => {
      redirect(`/bus/${id}`)
    }
  return (
    <Suspense fallback={null}>
    <div className=' flex items-center max-md:w-[94%] w-5/6 mx-auto gap-5 flex-col'>
      <h1 className='text-2xl font-semibold'>Search Result</h1>
      <p className='textbase font-semibold text-start'>{buses.length} bus found</p>

      {
       buses.length === 0 && (  <div className='w-full h-96 flex items-center justify-center'>
          <FiLoader className=" text-xl animate-spin" />
        </div>)
      }

     {  buses.length >0 && <div className='w-full grid items-center max-md:grid-cols-5 justify-between grid-cols-6'>
         <p>Bus name</p>
         <p>Departure</p>
         <p className=' max-md:hidden'>Arrive Time</p>
         <p>Price</p>
         <p>seat avilable</p>
         <p>View seat</p>
      </div>}
          {
           buses && buses?.map((bus:any) => {             
                return (
                <div key={bus.buses[0].id} className=' border-2 bg-[#3352cc23]  border-[#3352ccbb]  max-md:grid-cols-5 rounded-3xl mb-2 h-32 items-center justify-center  px-4 grid grid-cols-6 w-full h-62  '>
                    <div>
                    <p className=' text-xl font-extrabold'>{bus.buses[0].busName}</p>
                    <p className=' text-xs text-gray-400'>bus No - {bus.buses[0].busNumber}</p>
                    </div>
                    <p>{ convertUTCToLocal( bus.buses[0].startingTime)}</p>
                    <p className=' max-md:hidden' >{convertUTCToLocal(bus.buses[0].endingTime)}</p>
                    <h1>₹ {bus.buses[0].price}</h1>
                    <h1>{bus.buses[0]?.seats.length}</h1>
                    <button onClick={()=>handelClicked(bus?.buses[0].id)} className=' bg-gradient-to-r from-indigo-500 text-white via-purple-500 to-pink-500 p-4 max-md:py-3 rounded-full text-lg font-semibold'>view seat</button>
                    </div>
                )
            })
           } 
    </div>
    </Suspense>
  )
}
export default SearchPage
 