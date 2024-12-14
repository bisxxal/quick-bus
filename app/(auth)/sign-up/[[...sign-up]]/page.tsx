import { SignUp } from '@clerk/nextjs'
import { FaBus } from 'react-icons/fa'

export default function Page() {
  return (
  <div className=' flex flex-col items-center   gap-10 h-screen'> 
     <h1 className=' pt-52  max-md:mt-60 text-7xl max-md:text-5xl bg-gradient-to-r  from-[#CC3BD4]  to-[#D064AC]  font-bold  bg-clip-text flex  text-transparent items-center gap-3'>Quick Bus
       <FaBus className="text-5xl max-md:text-3xl textbase " /> </h1>
        <SignUp />
      </div>  
  )
}