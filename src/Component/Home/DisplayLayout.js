import { useState, useEffect } from "react";
import DisplaySeat from "./DisplaySeat";

const DisplayLayout = ({
  location,
  seatAvailability,
  seats,
  date,
  fromTime,
  toTime,
  flag,
  message1,
  setFlag,
}) => {
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const userId = sessionStorage.getItem("userId");
  const accId = sessionStorage.getItem("accoliteId");

  const handleBooking = () => {
    const bookingDetail = {
      locationId: location.id,
      userId: userId,
      seatId: selected,
      date: date,
      fromTime: fromTime,
      toTime: toTime,
      accoliteId: accId,
    };
    fetch(`http://localhost:8081/api/booking/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(bookingDetail),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("failed to book seat");
        }
        setSelected(null);
        setMessage(null);
        return res.json();
      })
      .then((data) => {
        setStatus(data.isSuccessful);
        setMessage(data.message);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const rows = [];
  for (let i = 1; i <= location.rs; i++) {
    const cols = [];
    for (let j = 1; j <= location.cs; j++) {
      const id = location.id + "R" + i + "C" + j;
      cols.push(
        <td>
          {!seatAvailability && (
            <DisplaySeat
              location={location}
              row={i}
              col={j}
              status={false}
              selected={selected}
            ></DisplaySeat>
          )}
          {seatAvailability && seatAvailability.hasOwnProperty(id) && (
            <div
              onClick={() => {
                setMessage(null);
                setSelected(id);
              }}
            >
              <DisplaySeat
                location={location}
                row={i}
                col={j}
                status={true}
                selected={selected}
              ></DisplaySeat>
            </div>
          )}
          {seatAvailability && !seatAvailability.hasOwnProperty(id) && (
            <DisplaySeat
              location={location}
              row={i}
              col={j}
              status={false}
              selected={selected}
            ></DisplaySeat>
          )}
        </td>
      );
    }
    rows.push(<tr>{cols}</tr>);
  }

  return (
    <>
      <div className="header">
        <h1>{location.name}</h1>
        <h3>Available Seats : {seatAvailability ? Object.keys(seatAvailability).length : 0}/{location.seatingCapacity}</h3>
        {message && status === 0 && <h3 style={{ color: "red" }}>{message}</h3>}
        {message && status === 1 && (
          <h3 style={{ color: "green" }}>{message}</h3>
        )}
        {selected && (
          <button
            className="button-group"
            onClick={() => {
              handleBooking();
            }}
          >
            Book Seat
          </button>
        )}
      </div>
      <table className="locationTable">{rows}</table>
    </>
  );
};

export default DisplayLayout;
