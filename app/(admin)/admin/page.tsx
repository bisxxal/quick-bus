// 'use client'
import { SearchBus } from '@/actions/admin.action';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import { CiSearch } from "react-icons/ci";
 
const AdminPage = () => { 
  const handelSearchSumbit = async(formData:FormData) => {
    'use server'
      const input = formData.get('bus')
      const res = await SearchBus(input as string)
     console.log(res.bus);
     redirect('/admin/search/'+res.bus)
     
  }
   
  return (
    <div className=' bg-black text-white h-screen p-3 '>
      <h1 className='text-4xl text-center'>Admin Page / <span>Quick bus</span></h1>
         <Link href='/admin/createbus' className='text-2xl text-center block mt-5'> Bus</Link>
          <h1>Update Bus details/ scheudule</h1>
          <form action={handelSearchSumbit} className=' border rounded-full p-2  flex justify-between'>
          <input required type="text" className='  bg-transparent  w-5/6 px-2' placeholder='enter bus number or name' name='bus' />
            <button type="submit"> <CiSearch /> </button>
          </form>
    </div>
  )
}

export default AdminPage
