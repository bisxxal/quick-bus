'use server'
 
import Razorpay from "razorpay"; 
import crypto from "crypto"; 
import { razorpayInstance } from "@/lib/utils/razorpay";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "./user.actions";


export async function Createpaymet({ amount }:any) { 
     
    try {
      const options = {
        amount: amount ,  
        currency: 'INR',
        receipt: `receipt_order_${new Date().getTime()}`,
      };
  
      const order = await razorpayInstance.orders.create(options);

      console.log('order in createpayment', order);
      
   
      return JSON.parse(JSON.stringify(order)); 

    } catch (error) { 
        console.log('error', error);
        
      return JSON.parse(JSON.stringify({ error: 'Failed to create order' , status:500 } )); 
    }
  }
 
export async function verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature , amount}:any) {


    console.log( "in sevver" ,'razorpay_order_id', razorpay_order_id , 'razorpay_payment_id', razorpay_payment_id, 'razorpay_signature', razorpay_signature , 'amount' , amount);
    
try {
   const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });
  
   const body = razorpay_order_id + "|" + razorpay_payment_id; 
 const expectedSignature = crypto
   .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
   .update(body.toString())
   .digest("hex");

const isAuthentic = expectedSignature === razorpay_signature;
 
 if (isAuthentic) {
    console.log('payment verified');
     
    const user = await getUser() 
//  if (user) {
    const payis =  await prisma.payment.create({
        data: {
          amount,  
          status:'PAID',
          // user:{
          //   connect:{
          //     id: user.id
          //   }
          // },
          userId: user.id,
          razorpay_order_id,
          razorpay_payment_id,
        },
      }); 
      console.log('payis', payis);    
// }
  return JSON.parse(JSON.stringify({ status: 200 ,paymentId: payis.id })); 
} 
else {
  return JSON.parse(JSON.stringify({ status: 404 }));   
}
} catch (error) { 
    if (error instanceof Error) {
        console.log('Error booking seats:', error.message);
        console.log('Stack trace:', error.stack);
      } else {
        console.log('Unexpected error:', error); 
      } 
}
}