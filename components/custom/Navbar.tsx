'use client'
import { FaBus } from "react-icons/fa";
import React, { use, useEffect } from 'react'
import {  SignedIn, SignedOut, SignInButton, UserButton, useUser, } from '@clerk/nextjs'
import { User } from 'lucide-react' 
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const user = useUser();
  const router = useRouter();
  const role = user?.user?.publicMetadata?.role;
  // useEffect(() => {
  //   console.log(user?.user?.publicMetadata?.role);
  //   if(role === 'admin') {
  //     router.push('/admin')
  //   }
  // } , [user]);
  return (
    <div className='px-10 max-md:px-5 w-full h-[60px] flex items-center border-b border-[#ffffff1b] fixed top-0 left-0 backdrop-blur-md justify-between'>
    <Link href={'/'} className='text-4xl max-md:text-2xl bg-gradient-to-r  from-[#CC3BD4]  to-[#D064AC]  font-bold  bg-clip-text flex  text-transparent items-center gap-3'>Quick Bus <FaBus className="text-3xl max-md:text-xl textbase " /> </Link>
    
      <div className=" flex items-center gap-5">
      <SignedIn>
       { role !== 'admin' ? <Link className=" font-bold textbase text-lg hover:underline " href="/profile">Profile</Link> 
       : <Link className=" font-bold textbase text-lg hover:underline " href="/admin">Admin</Link> 
       }
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className="rounded-xl max-md:text-sm flex items-center p-2 px-5 text-base buttonbg">
            <User size={21} />
            Login
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton>
        </UserButton>
      </SignedIn>
      </div>
  </div>
  )
}

export default Navbar

// bg-gradient-to-r from-indigo-500 text-white via-purple-500 to-pink-500