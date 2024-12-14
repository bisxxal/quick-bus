 
import { fetchDirection } from "@/actions/booking.actions";
import TicketBar from "@/components/custom/TicketBar";
import Image from "next/image";
 
export default async function Home() {
  const fetchDir = await fetchDirection()
  return (
    <div className=" flex flex-col items-end justify-center ">
       <div className=" h-[80vh] w-[95%] rounded-[50px] mx-auto gap-14 relative flex items-center flex-col overflow-hidden  ">
       <TicketBar fetchDir={fetchDir} />
            <div className=" w-full h-full absolute  top-0 left-0">
              <Image className=" w-full h-full object-cover object-right-bottom" src="https://images.unsplash.com/photo-1708786062644-6275b030ab8c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={2000} height={200} alt="" />  
            </div>

            <div className=" !z-20 "> 
            <h1 className=" capitalize  text-6xl max-md:text-5xl font-extrabold">book Bus with <span className=" bg-gradient-to-r  from-[#CC3BD4]  to-[#D064AC]  font-bold  bg-clip-text  text-transparent ">Quick Bus</span></h1>
            <p></p>
            </div>
       </div>
    </div>
  );
}
 