import React, { useEffect, useState } from "react";
function RequestAccess({ onClose, ...props }) {
  // const [description, setDescription] = useState("");
  const [bookingData, setBookingData] = useState({
    date: "",
    fromTime: "",
    toTime: "",
    roomType: "Available rooms",
  });
  const email = sessionStorage.getItem("email");
  const token = "Bearer " + sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (bookingData.description === "Your request has been sent succesfully!") {
      window.location.reload();
    }
  }, [bookingData.description]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting booking data: ${JSON.stringify(bookingData)}`);
    fetch("http://localhost:8081/api/requestBooking/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        email: email,
        ...bookingData,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setBookingData({
            date: "",
            fromTime: "",
            toTime: "",
            roomType: "",
            description: "Your request has been sent successfully!",
          });
          setTimeout(() => {
            props.setShowModal(false);
          }, 1000);
        } else {
          throw new Error("Failed to send request");
        }
      })
      .catch((error) => {
        setBookingData({
          ...bookingData,
          description: error.description,
        });
      });
  };


  return (
      <div className="request-card">
        <h3>Request Board/Discussion Room</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={bookingData.date}
            onChange={(event) =>
              setBookingData({ ...bookingData, date: event.target.value })
            }
          />
  
          <label htmlFor="fromTime">From</label>
          <input
            type="time"
            id="fromTime"
            value={bookingData.fromTime}
            onChange={(event) =>
              setBookingData({ ...bookingData, fromTime: event.target.value })
            }
          />
  
          <label htmlFor="toTime">To</label>
          <input
            type="time"
            id="toTime"
            value={bookingData.toTime}
            onChange={(event) =>
              setBookingData({ ...bookingData, toTime: event.target.value })
            }
          />
  
          <label htmlFor="roomType">Room Type</label>
          <select
            id="roomType"
            value={bookingData.roomType}
            onChange={(event) =>
              setBookingData({ ...bookingData, roomType: event.target.value })
            }
          >
            <option value="available">Available rooms</option>
          </select> <br></br>
  
          <span className="request-card-center">
            <button type="submit">Request</button>
            &nbsp;&nbsp;
            <button onClick={onClose}>Close</button>
          </span>
        </form>
      </div>
    );
  }
  
  export default RequestAccess;