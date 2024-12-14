'use client' 
import { seatCreate } from '@/actions/admin.action';
import { useState } from 'react';
import toast from 'react-hot-toast';

const SeatAdd = ({busId , seats}:{busId:number,seats?:any}) => {
  const [addSeat, setAddSeat] = useState([{ seatname: "" }]);
   
  const handleAddSeat = () => {
    setAddSeat([...addSeat, { seatname: "" }]);
  };
 
  const handleSeatChange = (index: number, value: string) => {
    const updatedSeats = [...addSeat];
    updatedSeats[index].seatname = value;
    setAddSeat(updatedSeats);
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
     
    const seatnames = addSeat.map(seat => seat.seatname).filter(name => name);
     const res =  await seatCreate(seatnames, busId);
        if(res.status === 200) {
        toast.success('Seats Added Successfully')
        }
  };
 
  return (
    <form onSubmit={handleSubmit} className="border-2 p-4  rounded-3xl bg-[#3352cc23]  border-[#3352CC] mt-5 w-full mx-auto ">

<h1 className=' mb-5 text-center text-lg'>Add seats </h1>
    <div className=' flex flex-wrap gap-3'>
    { seats && seats?.map((seat:any, index:number) => ( 
          <p key={index}
            className="bg-[#00ff007c] text-sm border rounded-lg flex items-center justify-center border-[#00ff00] h-10 w-10"
              >{seat.seatNumber}
          </p> 
      ))}
    </div>


     <div className=' flex flex-wrap my-5 gap-3'>
     {addSeat.map((seat, index) => (
        <div key={index} className=" text-xs inline-block gap-2">
          <input
            required
            className="bg-transparent border-2 rounded-xl border-[#3352CC] h-10 w-10"
            type="text"
            placeholder={`Seat ${index + 1}`}
            name={`seatname-${index}`}
            value={seat.seatname}
            onChange={(e) => handleSeatChange(index, e.target.value)}  // Update seat name
          />
        </div>
      ))} 
<button
        type="button"
        onClick={handleAddSeat}
        className="border-2 rounded-2xl text-sm  border-[#3352CC] p-3"
      >
        Add Seat
      </button>
      </div>

      <button disabled={!busId} type="submit" className=" buttonbg rounded-2xl w-40 p-3">Submit</button>
      
    </form>
  );
};

export default SeatAdd;
