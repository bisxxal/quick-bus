import { getBooking,  } from '@/actions/booking.actions'; 
const page = async( {params}:any) => {  
const { id } = await params  
const busDetails = await getBooking(Number(id)); 
  return (
    <div> 
       <div>
        <h1> {busDetails?.user?.firstName } {busDetails?.user?.lastName } </h1>
        <p>{busDetails?.bus?.busNumber}</p>
        <p>{busDetails?.bus?.route?.startPoint}</p>
        <p>{busDetails?.bus?.route?.endPoint}</p>
        <p>{busDetails?.createdAt?.toLocaleString()}</p>
 
        <h2>Seats</h2>
        <div>
          {busDetails?.bus.seats.map((seat) => (
            <p key={seat.id} style={{marginRight: 10, color: seat.isBooked ? 'red' : 'green'}}>
              {seat.seatNumber}
            </p>
          ))}

        </div>
       </div>
       {
        busDetails?.id
       }
    </div>
  )
}

export default page
