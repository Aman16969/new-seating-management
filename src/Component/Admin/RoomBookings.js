import { useEffect, useState } from "react";

const RoomBookings = () => {
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    const email=sessionStorage.getItem("email");
    const [acceptedRequest, setAcceptedRequest] = useState(null);
    const[data,setData]=useState(null)
    const yearMonthDay = new Date();
  const currentDate = yearMonthDay.toISOString().substr(0, 10);
    useEffect(()=>{
        fetch(`http://localhost:8081/api/bookRoom/admin/${email}`, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then((res)=>{
        if(!res.ok){
            throw Error("failed")
        }
        return res.json()
    }).then((data)=>{
        setData(data)
        console.log(data)

    })
    },[acceptedRequest])
    return ( <>
    {data && data.map((booking)=>{
        if(booking.date>=currentDate){
            return(
                <tr className="user-row" key={booking.id} style={{fontSize:'11px'}}> 
                    <td>{booking.user.accoliteId}</td>
                    <td>{booking.date}</td>
                    <td>{booking.fromTime.substring(0,5)} - {booking.toTime.substring(0,5)}</td>
                    <td>{booking.roomType}</td>
                    <td>{booking.room.name}</td>
                </tr>
            )
        }
        
    })}
    </> );
}
 
export default RoomBookings;