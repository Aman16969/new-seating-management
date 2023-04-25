import { useState, useEffect } from "react";
import DisplaySeat from "./DisplaySeat";

const DisplayLayout = ({ location, seatAvailability, seats, date, fromTime, toTime }) => {
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const handleBooking = () => {
    const bookingDetail = {
      locationId: location.id,
      userId: userId,
      seatId: selected,
      date: date,
      fromTime: fromTime,
      toTime: toTime,
    };
    fetch(`http://localhost:8081/api/booking/`, {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: "Bearer "+token },
      body: JSON.stringify(bookingDetail),
    }).then((res) => {
      if (!res.ok) {
        throw Error("failed to book seat");
      }
      setSelected(null);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setStatus(data.isSuccessful);
      setMessage(data.message);
    }).catch((error)=>{
      setError(error.message);
      console.log(error.message);
    })
  };

  const rows = [];
  for (let i = 1; i <= location.rs; i++) {
    const cols = [];
    for (let j = 1; j <= location.cs; j++) {
      const id = location.id + "R" + i + "C" + j;
      if(seatAvailability===null){
      cols.push(
        <td>
          <div id={id} name={id}>
            {
              <DisplaySeat
                location={location}
                row={i}
                col={j}
                status={false}
              ></DisplaySeat>
            }
          </div>
        </td>
      );
    }
    else{
      cols.push(
        <td>
          <div id={id} name={id} onClick={()=>{setSelected(id)}}>
            {
              <DisplaySeat
                location={location}
                row={i}
                col={j}
                selected={selected}
                status={seatAvailability.hasOwnProperty(id)}
              ></DisplaySeat>
            }
          </div>
        </td>
      );
    }
    }
    rows.push(<tr>{cols}</tr>);
  }

  return (
    <>
      <h1>{location.name}</h1>
      <table>{rows}</table>
      {selected && <button onClick={()=>{handleBooking()}}>Book Seat</button>}
      {message && status===0 && <h3 style={{color:"red"}}>{message}</h3>}
      {message && status===1 && <h3 style={{color:"green"}}>{message}</h3>}
    </>
  );
};

export default DisplayLayout;
