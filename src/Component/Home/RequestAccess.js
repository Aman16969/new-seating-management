import React, { useEffect, useState } from "react";

function RequestAccess({ onClose, ...props }) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [roomType, setRoomType] = useState("available");

  const email = sessionStorage.getItem("email");
  const token = "Bearer " + sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (description === "Your request has been sent successfully!") {
      window.location.reload();
    }
  }, [description]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Submitting request: ${description}, ${date}, ${fromTime}, ${toTime}, ${roomType}`
    );
    const requestData = {
      email,
      description,
      date,
      fromTime,
      toTime,
      roomType,
    };
    console.log(JSON.stringify(requestData));
    fetch("http://localhost:8081/api/requestBooking/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          setDescription("Your request has been sent successfully!");
          setTimeout(() => {
            props.setShowModal(false);
          }, 1000);
        } else {
          throw new Error("failed to send request");
        }
      })
      .catch((error) => {
        setDescription(error.Description);
      });
  };

  return (
    <div className="request-card">
      <h3>Request Board/Discussion Room</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          placeholder="Please provide your role along with purpose"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type="date"
          className="form-control"
          placeholder="Date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <input
          type="time"
          className="form-control"
          placeholder="From time"
          value={fromTime}
          onChange={(event) => setFromTime(event.target.value)}
        />
        <input
          type="time"
          className="form-control"
          placeholder="To time"
          value={toTime}
          onChange={(event) => setToTime(event.target.value)}
        />
        <select
          className="form-control"
          value={roomType}
          onChange={(event) => setRoomType(event.target.value)}
        >
          <option value="available">Available Rooms</option>
        </select>
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