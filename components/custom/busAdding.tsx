'use client' 
import { addBus, UpdateBus } from "@/actions/admin.action"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import SeatAdd from "./SeatAdd";
const BusAdding = ({bus , type}:{bus?:any , type:'update'|'create'}) => {
  const [isLoading , setLoading] = useState(false)
  const [busId, setBusId] = useState<number|null>(null);   
  const router = useRouter()
 
    const handleSubmit =async (formData:FormData) => { 
      setLoading(true)
        const busName = formData.get('busname') as string
        const busNumber = formData.get('busnumber') as string
        const capacity = parseInt(formData.get('capacity') as string)
        const price = parseInt(formData.get('price') as string)
        const startingTime = new Date(formData.get('startingTime') as string)
        const endingTime = new Date(formData.get('endingTime') as string)
        const startpoint = formData.get('startpoint') as string
        const endpoint = formData.get('endpoint') as string

        if(type === 'update') {
         
          const data =await UpdateBus(bus.id , bus.route.id ,busNumber, busName.toLowerCase(), capacity, startingTime, endingTime, price , startpoint , endpoint)
          if(data.status === 200) {
            toast.success('Bus Updated Successfully')
            router.refresh()
          }
        }
        else{
          const data =await addBus(busName.toLowerCase(),busNumber, capacity, startingTime, endingTime, price , startpoint , endpoint)
        
          if (data.status === 200) {
            const id = data?.busId; 
            setBusId(id);
       
            toast.success("Bus Added Successfully");
       
            setTimeout(() => {
              router.refresh();
            }, 100); 
          }
        }
        setLoading(false)
    }
  return (
    <div className=" w-[50%] max-md:w-[87%]  mx-auto">
      <form action={handleSubmit} className=" flex flex-col gap-2 !w-full">
        <label className="w-full text-gray-400 text-lg mt-2 -mb-2">Bus name</label>
        <input required className="   placeholder:text-gray-500 border bg-[#3352cc23]  border-[#3352CC]  rounded-2xl  p-3 "  defaultValue={bus?.busName} type="text" placeholder="busname" name="busname" id="busname"/>
        <label className=" text-gray-400 text-lg mt-2 -mb-2">Bus Number</label>
        <input required className="   placeholder:text-gray-500 border bg-[#3352cc23]  border-[#3352CC]  rounded-2xl  p-3 " defaultValue={bus?.busNumber} type="text" placeholder="bus number" name="busnumber" />
        <label className=" text-gray-400 text-lg mt-2 -mb-2">Bus Capacity</label>
        <input required className="   placeholder:text-gray-500 border bg-[#3352cc23]  border-[#3352CC]  rounded-2xl  p-3 " defaultValue={bus?.capacity} type="number" placeholder="capacity" name="capacity" />
        <label className=" text-gray-400 text-lg mt-2 -mb-2">Bus name</label>
        <input required className="   placeholder:text-gray-500 border bg-[#3352cc23]  border-[#3352CC]  rounded-2xl  p-3 " defaultValue={bus?.price} type="number" placeholder="price" name="price" />
        <label className=" text-gray-400 text-lg mt-2 -mb-2">Starting date</label>
        <input required className=" border border-[#3352CC]  rounded-2xl  p-3 bg-[#3352cc23]  " defaultValue={bus?.startingTime} type="date" name="startingTime" />
        <label className=" text-gray-400 text-lg mt-2 -mb-2">ending date</label>
        <input required className=" border border-[#3352CC]  rounded-2xl  p-3 bg-[#3352cc23] "  defaultValue={bus?.endingTime} type="date" name="endingTime" />
        <label className=" text-gray-400 text-lg mt-2 -mb-2">Starting point</label>
        <input required className="   placeholder:text-gray-500 border bg-[#3352cc23]  border-[#3352CC]  rounded-2xl  p-3 " type="text"  defaultValue={bus?.route.startPoint}  placeholder="startpoint" name="startpoint" />
        <label className=" text-gray-400 text-lg mt-2 -mb-2">ending point</label>
        <input required className="   ring-0 focus:ring-0 placeholder:text-gray-500 border bg-[#3352cc23]  border-[#3352CC]  rounded-2xl  p-3 " type="text"  defaultValue={bus?.route.endPoint} placeholder="endpoint" name="endpoint" />
        <button disabled={isLoading} className=" buttonbg mt-4 p-3  rounded-2xl flex items-center justify-center " type="submit">
          {isLoading ? <FiLoader className=" text-xl animate-spin" /> : type === 'create' ? 'Submit' : 'Update'}
        </button>
 

      </form>
 {
  bus && <SeatAdd busId={bus.id} seats={bus.seats} />
 }
 {
  busId && <SeatAdd busId={busId}/>
 }
    </div>
  )
}

export default BusAdding

// bg-gradient-to-r 
//         from-[#CC3BD4] 
//         to-[#D064AC] 
//         font-bold 
//         bg-clip-text 
//         text-transparent