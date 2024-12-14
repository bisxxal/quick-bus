import { featchBus } from '@/actions/admin.action';
import BusAdding from '@/components/custom/busAdding';
import React from 'react'

const page = async( {params}:any) => { 
    const { id } = await params 

    const bus  = await featchBus(Number(id));
    
  return (
    <div className=' w-full h-screen mt-20 flex-col flex items-center justify-center'>
  <h1>Update Bus Details</h1>
      <BusAdding type='update' bus={bus} />
    </div>
  )
}

export default page
