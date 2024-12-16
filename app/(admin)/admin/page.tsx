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
      <h1 className='text-4xl max-md:text-xl font-bold text-center'>Admin Page / <span className=' bg-gradient-to-r  from-[#CC3BD4]  to-[#D064AC] bg-clip-text text-transparent'>Quick bus</span></h1>
         
         <Link href='/admin/createbus' className='text-2xl max-md:text-base buttonbg text-center mb-7 mx-auto block w-[200px] max-md:w-[120px] py-3 mt-5'>Create Bus</Link>
          <h1 className=' w-1/2 max-md:w-5/6 mx-auto text-2xl max-md:text-lg text-center font-semibold my-7'>Update Bus details / scheudule</h1>
          <AdminBusSearch handelSearchSumbit={handelSearchSumbit} />
    </div>
  )
}

export default AdminPage
