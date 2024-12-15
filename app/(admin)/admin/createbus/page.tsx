import BusAdding from '@/components/custom/busAdding'
import React from 'react'

const page = () => {
  return (
    <div className=' !w-full h-screen mt-20 max-md:px-5 flex-col flex items-center justify-center'>
        <h1 className='text-4xl bg-gradient-to-r  from-[#CC3BD4]  to-[#D064AC]  font-bold  bg-clip-text  text-transparent'>Add Bus </h1>
       <BusAdding type='create'/>
    </div>
  )
}

export default page
