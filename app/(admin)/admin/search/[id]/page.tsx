import { featchBus } from '@/actions/admin.action';
import BusAdding from '@/components/custom/busAdding';
import React from 'react'

const page = async( {params}:any) => { 
    const { id } = await params 

    const bus  = await featchBus(Number(id));
    
  return (
    <div>
      <BusAdding type='update' bus={bus} />
    </div>
  )
}

export default page
