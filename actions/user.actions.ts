'use server';

import prisma from "@/lib/prisma";

// export const createUser = async (user:any) => {  

//   console.log('user', user);
  
//     try {
//       const newUser = await prisma.user.create({
//         data:{
//           email:user.email,
//           clerkId:user.clerkId,
//           firstName:user.first_name,
//             lastName:user.last_name,
//         }
//       })
//       console.log(newUser);
      
//       return JSON.parse(JSON.stringify(newUser))
//     } catch (error) {
//       console.log('error when creating user' , error);
//       // return JSON.parse(JSON.stringify('error when creating user' ))
//     }
//   }
 

export const createUser = async (user: any) => {
  try {
    // Validate that the user object is properly structured
    if (!user || typeof user !== 'object' || !user.email || !user.clerkId || !user.first_name || !user.last_name) {
      throw new Error('Invalid user data');
    }

    console.log('user', user);  // Log the user data for debugging
    
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        clerkId: "kjvaefbveirvfwj acvlskvd rvi",
        firstName: user.first_name,
        lastName: user.last_name,
      }
    });

    console.log('newUser', newUser);  // Log the created user

    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    // Make sure error is an object before logging
    const errorMessage = error ? error.message : 'Unknown error occurred';
    const errorStack = error ? error.stack : null;

    console.error('Error when creating user:', errorMessage);
    

    // Return a more detailed error response
    return {
      error: errorMessage,
      stack: errorStack,
    };
  }
};
