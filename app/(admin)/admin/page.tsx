import { SearchBus } from '@/actions/admin.action';
import AdminBusSearch from '@/components/custom/AdminBusSearch';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import { CiSearch } from "react-icons/ci";
 
const AdminPage = () => {
  // const 
  const handelSearchSumbit = async(formData:FormData) => {
    'use server'
      const input = formData.get('bus')
      const res = await SearchBus(input as string) 
    if(res.bus){
      redirect('/admin/search/'+res.bus)
    }
    else{
      return alert('Bus not found')
    }
  }
   
  return (
    <div className=' bg-black text-white h-screen p-3 '>
      <h1 className='text-4xl font-bold text-center'>Admin Page / <span className=' bg-gradient-to-r  from-[#CC3BD4]  to-[#D064AC] bg-clip-text text-transparent'>Quick bus</span></h1>
         
         <Link href='/admin/createbus' className='text-2xl buttonbg text-center mx-auto block w-[200px] py-3 mt-5'>Create Bus</Link>
          <h1 className=' text-2xl font-semibold mt-4'>Update Bus details / scheudule</h1>
          <AdminBusSearch handelSearchSumbit={handelSearchSumbit} />
    </div>
  )
}

export default AdminPage
