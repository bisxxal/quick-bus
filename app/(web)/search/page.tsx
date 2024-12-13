'use client'
import { SearchBuses } from '@/actions/booking.actions'
import { redirect, useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchPage = () => {
    const path = useSearchParams() 
    
    const form = path.get('from') as string
    const to = path.get('to') as string
    const dateValue =    path.get('date') as string | null;
 
        const date = dateValue ? new Date(dateValue) : new Date();
 
const [buses, setBuses] = useState([])
    useEffect(()=>{
        featchBusses()
    } , [path])
    const featchBusses = async () => {  
         const bus = await SearchBuses(to, form, date) 
      setBuses(bus.bus); 
      } 

      const handelClicked = (id:string) => {
        redirect(`/bus/${id}`)
      }
    // console.log(buses);
    
  return (
    <div className=' flex items-center gap-5 flex-col'>
      <h1 className='text-2xl font-semibold'>Search Result</h1>
      <p>{buses.length} bus found</p>
          {
            buses?.map((bus:any) => {
              console.log("bussed",bus);
                return (
                 
                <div key={bus.buses[0].id} className=' border-2 border-[#ffffff46] rounded-lg mb-2 h-32 items-center justify-center  px-4 grid grid-cols-5 w-full h-62  '>
 
                               <div>
                                <h1>{bus.buses[0].busNumber}</h1>
                                  <p>Vov vo</p>
                                </div>
                                <div>
                                <p>{bus.buses[0].startingTime?.toLocaleString()}</p>
                                  <p>Starting  date</p>
                                </div>
                                <div>
                                 <p>{bus.buses[0].endingTime?.toLocaleString()}</p>
                                  <p>Ending date</p>
                                </div>
                                <div>
                                <h1>₹ {bus.buses[0].price}</h1>
                                </div> 
                                <div>
                                  <button onClick={()=>handelClicked(bus?.buses[0].id)} className=' font-semibold bg-red-500 p-2 rounded-3xl px-4'>view seat</button>
                                </div>
                                </div>
                )
            })
           }



      
    </div>
  )
}

export default SearchPage
