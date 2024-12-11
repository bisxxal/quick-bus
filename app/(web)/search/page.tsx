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
      setBuses(bus[0].buses);
      console.log(bus);
      
      
      } 

      const handelClicked = (id:string) => {
        redirect(`/bus/${id}`)
      }
    
  return (
    <div>
          {
            buses?.map((bus:any) => {
                return (
                // <div key={bus.id} >
                //     <h1>{bus.busNumber}</h1>
                //     <h1>{bus.capacity}</h1>
                // </div>

                <div key={bus.id} className=' border-2 border-[#ffffff46] rounded-lg mb-2 h-32 items-center justify-center  px-4 grid grid-cols-5 w-full h-62  '>

                <div>
                <h1>{bus.busNumber}</h1>
                  <p>Vov vo</p>
                </div>
                <div>
                  <p>12:03</p>
                  <p>Starting  date</p>
                </div>
                <div>
                  <p>12:03</p>
                  <p>Ending date</p>
                </div>
                <div>
                  <p>$123</p>
                </div> 
                <div>
                  <button onClick={()=>handelClicked(bus?.id)} className=' font-semibold bg-red-500 p-2 rounded-3xl px-4'>view seat</button>
                </div>
      
            </div>
                )
            })
           }



      
    </div>
  )
}

export default SearchPage
