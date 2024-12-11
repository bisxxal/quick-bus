'use client' 
import { redirect } from 'next/navigation'

const TicketBar = ({fetchDir}:any) => {
     
    const handelclicked = (e:any) => {  
    e.preventDefault()
    redirect(`/search?from=${e.target.from.value}&to=${e.target.to.value}&date=${e.target.date.value}`)
    }
   
  return (
    <form onSubmit={handelclicked} className=' w-5/6 bg-blue-400 h-60 '>
      <select required className=' border-2 border-black rounded-2xl black p-3 bg-transparent ' name="from"  >
        {
            fetchDir?.map((dir:any) => {
                return <option key={dir.id} value={dir.startPoint}>{dir.startPoint}</option>
            })
        }
        
      </select>
      <select required className=' border-2 border-black rounded-2xl black p-3 bg-transparent ' name="to"  >
      {
            fetchDir.map((dir:any) => {
                return <option key={dir.id} value={dir.endPoint}>{dir.endPoint}</option>
            })
        }
      </select>

      <input required className=' text-black' type="date" name="date" id="" />

      <button type="submit">Search</button>
   
    </form>
  )
}

export default TicketBar
