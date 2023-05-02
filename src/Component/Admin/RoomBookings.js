import { useEffect, useState } from "react";

const RoomBookings = () => {
    const token = "Bearer " + sessionStorage.getItem("accessToken");
    const email=sessionStorage.getItem("email");
    const[data,setData]=useState(null)
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
    },[])
    return ( <>
    {data && data.map((booking)=>{
        return(
            <tr className="user-row">
                <td>{booking.date}</td>
                <td>{booking.roomType}</td>
                <td>{booking.room.name}</td>
            </tr>
        )
    })}
    </> );
}
 
export default RoomBookings;