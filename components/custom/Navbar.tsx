import { FaBus } from "react-icons/fa";
import React from 'react'
import {  SignedIn, SignedOut, SignInButton, UserButton, } from '@clerk/nextjs'
import { User } from 'lucide-react' 
import Link from "next/link";

const Navbar = () => {
  return (
    <div className='px-10 max-md:px-5 w-full h-[60px] flex items-center border-b border-[#ffffff1b] fixed top-0 left-0 backdrop-blur-md justify-between'>
    <Link href={'/'} className='text-4xl bg-gradient-to-r  from-[#CC3BD4]  to-[#D064AC]  font-bold  bg-clip-text flex  text-transparent items-center gap-3'>Quick Bus <FaBus className="text-3xl textbase " /> </Link>
    
      <div className=" flex items-center gap-5">
      <SignedIn>
        <Link className=" font-bold textbase text-lg hover:underline " href="/profile">Profile</Link>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className="rounded-xl flex items-center p-2 px-5 text-base buttonbg">
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