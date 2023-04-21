import { useEffect, useState, useContext } from "react";
import AuthContext from "../../ContextApi/AuthContext";
const CompletedBooking = (props) => {
  const authContext = useContext(AuthContext);
  const { token, accessToken } = authContext;
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [CompletedBooking, setCompletedBooking] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [message, setMessage] = useState("");
  const [bookId, setBookId] = useState(null);
  // useEffect(() => {
  //   const header = "Bearer " + sessionStorage.getItem("accessToken");
  //   const userId = sessionStorage.getItem("userId");
  //   fetch(`http://localhost:8081/api/booking/user/?user=${userId}`, {
  //     headers: {
  //       Authorization: header,
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw Error("Response not received");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCompletedBooking(data);
  //       setIsPending(false);
  //       props.setFlagBooking(!props.flagBooking);
  //     })
  //     .catch((err) => {
  //       setIsPending(false);
  //     });
  // }, [props.flagBooking]);

  
  return (
    <>
      {CompletedBooking && (
        <table>
          <thead>
            <tr className="user-row">
              <th>Date</th>
              <th>Location</th>
              <th>Seat Name</th>
            </tr>
          </thead>
          <tbody>
            {isPending && <span>Loading.</span>}
            {CompletedBooking &&
              CompletedBooking
                .sort((a, b) => {
                  const [yearA, monthA, dayA] = a.date.split("-");
                  const bookingDateA = new Date(yearA, monthA - 1, dayA);
                  const [yearB, monthB, dayB] = b.date.split("-");
                  const bookingDateB = new Date(yearB, monthB - 1, dayB);
                  return bookingDateA - bookingDateB;
                })
                .map((booking) => {
                  const [year, month, day] = booking.date.split("-");
                  const bookingDate = new Date(year, month - 1, day);
                  if (bookingDate >= new Date()) {
                    return (
                      <tr key={booking.id} className="user-row">
                        <td>{booking.date}</td>
                        <td>{booking.location.name}</td>
                        <td>{booking.seat.name}</td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CompletedBooking;
