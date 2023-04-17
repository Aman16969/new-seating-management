import { useEffect, useState, useContext } from "react";
import AuthContext from "../../ContextApi/AuthContext";
const UpcomingBooking = (props) => {
  const authContext = useContext(AuthContext);
  const { token, accessToken } = authContext;
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [upcomingBooking, setupcomingBooking] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [message, setMessage] = useState("");
  const [bookId, setBookId] = useState(null);
  useEffect(() => {
    const header = "Bearer " + sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");
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
        props.setFlagBooking(!props.flagBooking);
      })
      .catch((err) => {
        setIsPending(false);
      });
  }, [props.flagBooking]);

  const handlePopup = (e) => {
    setBookId(e);
    setIsOpenCon(true);
  };
  const handleDelete = (bookId) => {
    const header = "Bearer " + sessionStorage.getItem("accessToken");
    fetch(`http://localhost:8081/api/booking/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: header,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("cannot be deleted");
        }
        return res.json();
      })
      .then((e) => {
        setMessage("booking deleted successfully");
        setIsOpenCon(false);
        window.location.reload();
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
  return (
    <>
      {upcomingBooking && (
        <table>
          <thead>
            <tr className="user-row">
              <th>Booking Date</th>
              <th>Location</th>
              <th>Seat Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {isPending && <span>Loading.</span>}
            {upcomingBooking &&
              upcomingBooking
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
                        <td>
                          <button
                            className="button-group"
                            value={booking.id}
                            onClick={() => handlePopup(booking.id)}
                          >
                            x
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
          </tbody>
        </table>
      )}
      {isOpenCon && (
        <div className="popupContainer" onClick={() => setIsOpenCon(false)}>
          <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
            <div className="popupHeader">
              <h2>Are you sure to cancel this booking?</h2>
            </div>
            <div className="buttonsContainer">
              <button
                type="submit"
                className="submit-btn"
                onClick={() => handleDelete(bookId)}
              >
                Yes
              </button>
              <button
                type="reset"
                className="cancel-btn"
                onClick={() => setIsOpenCon(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingBooking;
