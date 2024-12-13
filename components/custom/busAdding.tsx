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
    <div>
      <form action={handleSubmit} className=" flex flex-col gap-2 w-1/2">
        <input required className=" bg-transparent border-2 rounded-xl border-white p-3 "  defaultValue={bus?.busName} type="text" placeholder="busname" name="busname" />
        <input required className=" bg-transparent border-2 rounded-xl border-white p-3 " defaultValue={bus?.busNumber} type="text" placeholder="bus number" name="busnumber" />
        <input required className=" bg-transparent border-2 rounded-xl border-white p-3 " defaultValue={bus?.capacity} type="number" placeholder="capacity" name="capacity" />
        <input required className=" bg-transparent border-2 rounded-xl border-white p-3 " defaultValue={bus?.price} type="number" placeholder="price" name="price" />
        <input required className=" border-2 rounded-xl border-white p-3 bg-[#ffffff1d]  " defaultValue={bus?.startingTime} type="date" name="startingTime" />
        <input required className=" border-2 rounded-xl border-white p-3 bg-[#ffffff1d] "  defaultValue={bus?.endingTime} type="date" name="endingTime" />
        <input required className=" bg-transparent border-2 rounded-xl border-white p-3 " type="text"  defaultValue={bus?.route.startPoint}  placeholder="startpoint" name="startpoint" />
        <input required className=" bg-transparent border-2 rounded-xl border-white p-3 " type="text"  defaultValue={bus?.route.endPoint} placeholder="endpoint" name="endpoint" />
        <button disabled={isLoading} className=" bg-blue-500 p-3 rounded-lg flex items-center justify-center" type="submit">
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
