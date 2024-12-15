import { featchBus } from '@/actions/admin.action';
import BusAdding from '@/components/custom/busAdding';
import React from 'react'

const page = async( {params}:any) => { 
    const { id } = await params 

    const bus  = await featchBus(Number(id));
    
  return (
    <div className=' w-full min-h-screen mt-20 max-md:px-5 flex-col flex items-center justify-center'>
  <h1 className=' text-4xl bg-gradient-to-r  from-[#CC3BD4]  to-[#D064AC]  font-bold  bg-clip-text  text-transparent mt-10'> Update Bus Details</h1>
      <BusAdding type='update' bus={bus} />
    </div>
  )
}

export default page
