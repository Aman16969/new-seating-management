import { useEffect, useState } from "react";

const UpcomingBooking = () => {
  const userId = 2;
  const [upcomingBooking, setupcomingBooking] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8081/api/booking/user/?user=2`, {
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2LHJhamF2YXJhcHUudmlzc3dhdGV6YUBhY2NvbGl0ZWRpZ2l0YWwuY29tIiwiaXNzIjoiTWF0cml4Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2ODE0NTYwMzQsImV4cCI6MTY4MTU0MjQzNH0.grwJynQVPqRAdyqy0c8EOqjOFhMPoJCtzDx3xYQBrlA4M8Un2xdzgM3DiMH_t2cD5haPQR-JbmeUA3BGWNiUCg"   },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Response not recieved");
        }
        return res.json();
      })
      .then((data) => {
        setupcomingBooking(data);
        setIsPending(false)
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false)
      });
  }, []);
  return (
    <>
      <tbody>
        {isPending && <span>Loading.</span>}
        {error && <span>{error.message}</span>}
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
