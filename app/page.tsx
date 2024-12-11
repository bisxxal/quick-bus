 
import { fetchDirection } from "@/actions/booking.actions";
import TicketBar from "@/components/custom/TicketBar";
 
export default async function Home() {
  const fetchDir = await fetchDirection()
  return (
    <div className=" flex items-end justify-center ">
       
       <TicketBar fetchDir={fetchDir} />
    </div>
  );
}
