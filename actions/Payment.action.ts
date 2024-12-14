'use server'
import Razorpay from "razorpay"; 
import crypto from "crypto"; 
import { razorpayInstance } from "@/lib/utils/razorpay";
import prisma from "@/lib/prisma"; 
import { getUser } from "./user.actions";
import { handelError } from "@/lib/utils/error";
export async function Createpaymet({ amount }:any) { 
    try {
      const options = {
        amount: amount*100 ,  
        currency: 'INR',
        receipt: `receipt_order_${new Date().getTime()}`,
      };
      const order = await razorpayInstance.orders.create(options);
      return JSON.parse(JSON.stringify(order)); 
    } catch (error) { 
        handelError(error , 'Create paymet');
    }
  }
 
export async function verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature , amount}:any) {
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
    const user = await getUser()  
    const payis =  await prisma.payment.create({
        data: {
          amount,  
          status:'PAID', 
          userId: user.id,
          razorpay_order_id,
          razorpay_payment_id,
        },
      });
  return JSON.parse(JSON.stringify({ status: 200 ,paymentId: payis.id })); 
} 
else {
  return JSON.parse(JSON.stringify({ status: 404 }));   
}
} catch (error) { 
    handelError(error , 'verifyPayment');
}
}