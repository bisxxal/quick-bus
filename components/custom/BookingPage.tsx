'use client';
import { bookSeat } from '@/actions/booking.actions';
import { Createpaymet, verifyPayment } from '@/actions/Payment.action';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';
import { GiCarSeat } from "react-icons/gi"; 
const BookingPage = ({busDetails ,user}:any) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const p = useParams();
  const id = parseInt(p.id as string);
  const handleSeatClick = (seatId: number) => {
      setSelectedSeats((prev) => {
        const newSelectedSeats = new Set(prev);
        if (newSelectedSeats.has(seatId)) {
          newSelectedSeats.delete(seatId);
        } else {
          newSelectedSeats.add(seatId);
        }
        return newSelectedSeats;
      });
    }; 
    const handlePayment = async (amount: number) => {
      try {
        const response = await Createpaymet({ amount }); 
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: response.amount,
          currency:'INR',
          name: 'Bus Seat Booking',
          description: 'Payment for bus seat booking',
          order_id: response.id,
          handler: async (response: any) => { 
            console.log('Payment response:', response);
            const razorpay_payment_id =  response.razorpay_payment_id;
            const razorpay_order_id  =   response.razorpay_order_id;
            const razorpay_signature =   response.razorpay_signature;
            const data = await verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature , amount});
            
            if (data.status === 200 ) {
                bookTIcket(data.paymentId)  
            } else {
              toast.error('Payment verification failed');
            }
          },
          prefill: {
            name: `${user?.firstName} ${user?.lastName}` , 
            email: user?.email,
          },
          theme: {
            color: '#528FF0',
          },
        };
        const rzp = new (window as any).Razorpay(options); 
        rzp.open();
      } catch (error) { 
        toast.error('error while processing payment');
      }
    }; 
    const handleSubmit = async () => {
      if (!busDetails || selectedSeats.size === 0) return;
      if(!user){
        return router.push('/sign-in');
      }
      const amount = busDetails.bus.price * selectedSeats.size;
        handlePayment(amount); 
    };
    const bookTIcket = async (paymentid:number) => {
      setLoading(true);
      if (!busDetails || selectedSeats.size === 0) return; 
      const selectedSeatIds = Array.from(selectedSeats); 
        const result = await bookSeat({
        userId:1,  
        busId: id,
        seatIds: selectedSeatIds,
        paymentId: paymentid!,
      }) 
      // router.push(`/ticket/${result?.booking.id}`); 
      setLoading(false);

      setTimeout(() => {
        // router.refresh();
        router.push(`/ticket/${result?.booking.id}`); 
      }, 100); 
    }
  return (
    <div className="container relative mx-auto p-4 ">

    { loading && <div className=' absolute bg-[#00000054] backdrop-blur-lg flex flex-col gap-2 items-center justify-center h-screen z-10 right-0 top-0 w-full'>
        <p>Booking seat</p>
        <p className=' text-gray-500 -mt-2 '>Dont press any button or go back </p>
      <FiLoader className=" text-2xl animate-spin" /> 
      </div>}
    <h1 className="text-2xl font-bold">Bus Seat Booking</h1>
  
    <div className="grid grid-cols-5 p-3 rounded-xl border-2 border-[#ffffff47] gap-2 mt-4">
      {busDetails?.availableSeats?.map((seat:any) => (
        <button
          key={seat.id}
          onClick={() => !seat.isBooked && handleSeatClick(seat.id)}
          disabled={seat?.isBooked}
          className={` w-20 h-14 rounded-xl ${
            seat.isBooked
              ? 'bg-gray-400 cursor-not-allowed'
              : selectedSeats.has(seat.id)
              ? 'bg-red-500'
              : 'bg-green-500'
          }  group flex items-center justify-center`}
        >
         <GiCarSeat className='  text-2xl  mirror' />
          <span className='opacity-0 group-hover:opacity-100 transition-all font-bold' >  {seat?.seatNumber} </span>
        </button>
      ))}
    </div>
    <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded">Confirm Booking</button>
  
  </div>
  )
}

export default BookingPage
