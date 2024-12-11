'use server';

import prisma from "@/lib/prisma";

export const createUser = async (user:any) => {  
    try {
      const newUser = await prisma.user.create({
        data:{
          email:user.email,
          clerkId:user.clerkId,
          firstName:user.first_name,
            lastName:user.last_name,
        }
      })
      console.log(newUser);
      
      return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
      // console.log('error when creating user' , error);
      // return JSON.parse(JSON.stringify('error when creating user' ))
    }
  }
 