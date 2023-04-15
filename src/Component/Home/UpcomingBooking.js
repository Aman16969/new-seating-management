import { useEffect, useState,useContext } from "react";
import AuthContext from "../../ContextApi/AuthContext";
const UpcomingBooking = () => {
  const authContext = useContext(AuthContext);
const { token,accessToken } = authContext;
const userId = 2;
const [upcomingBooking, setupcomingBooking] = useState(null);
const [isPending, setIsPending] = useState(true);
console.log(token)
useEffect(() => {
  const header = "Bearer " + localStorage.getItem('accessToken');
  fetch(`http://localhost:8081/api/booking/user/?user=${userId}`, {
    headers: {
      Authorization: header,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("Response not received");
      }
      return res.json();
    })
    .then((data) => {
      setupcomingBooking(data);
      setIsPending(false);
    })
    .catch((err) => {
      setIsPending(false);
    });
}, [token]);
  return (
    <>
      <h1>{token}</h1>
      <tbody>
        {isPending && <span>Loading.</span>}
       
        {upcomingBooking && upcomingBooking.map((booking)=>
        <tr key={booking.id} className="table-row">
        <td>
            <span>&#x2022;</span>{booking.date}
        </td>
        <td>{booking.location.name}</td>
        <td>{booking.seat.name}</td>
        <td>
        <button className="button-group" value={booking.id} >x</button>
    </td>
    </tr>
    )}
      </tbody>
    </>
  );
};

export default UpcomingBooking;
