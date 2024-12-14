'use client' 
import { redirect } from 'next/navigation'

const TicketBar = ({fetchDir}:any) => {
     
    const handelclicked = (e:any) => {  
    e.preventDefault()
    redirect(`/search?from=${e.target.from.value}&to=${e.target.to.value}&date=${e.target.date.value}`)
    }
 
  return (
    <form onSubmit={handelclicked} className=' w-[60%] max-md:w-[80%]  gap-2  backdrop-blur-lg rounded-[50px] max-md:p-4  max-md:rounded-[40px] h-32 max-md:h-80  flex items-center justify-center z-[20] mt-40  '>
     
     <div className=' w-[97%] max-md:flex-col max-md:px-3 flex gap-2 max-md:gap-5 border-[#3352cc] border-2 max-lg:rounded-[30px] rounded-full  py-4 '>
     <select required className='outline-none black text-xl font-semibold p-3 bg-transparent ' name="from"  >
        {
            fetchDir?.map((dir:any) => {
                return <option key={dir.id} value={dir.startPoint}>{dir.startPoint}</option>
            })
        }
        
      </select>
      <select required className='outline-none text-xl max-md:py-4 font-semibold border-x-2 max-md:border-y-2 max-md:border-x-0 border-[#3352cc] black p-3 bg-transparent ' name="to"  >
      {
            fetchDir.map((dir:any) => {
                return <option key={dir.id} value={dir.endPoint}>{dir.endPoint}</option>
            })
        }
      </select>

      <input id='myDate' required defaultValue={Date.now()} placeholder=' date' className='max-md:w-full outline-none w-52 text-xl font-semibold bg-transparent' type="date" name="date" />

      <button className='buttonbg max-md:mx-auto max-md:w-full !text-xl !font-bold p-6 py-5 w-44 ml-9' type="submit">Search</button>
     </div>
   
    </form>
  )
}

export default TicketBar
