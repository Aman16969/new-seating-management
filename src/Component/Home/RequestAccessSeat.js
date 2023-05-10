import { useState } from "react";
import GetLocation from "./GetLocation.js";
const RequestAccessSeat = ({ onClose, ...props }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [locationId, setLocationId] = useState(null);
  const [lFlag, setLFlag] = useState(false);
  const email = sessionStorage.getItem("email");
  const token = "Bearer " + sessionStorage.getItem("accessToken");
  const [message, setMessage] = useState("");

  function handleSubmit() {
    const requestData = {
      email,
      date,
      fromTime,
      toTime,
      locationId,
      description,
    };
    fetch(`http://localhost:8081/api/request/seat/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Your request has been sent successfully!");
          props.setRFlag(!props.rFlag);
          setTimeout(() => {
            onClose();
            setMessage("");
          }, 1500);
        } else {
          throw new Error("failed to send request");
        }
      })
      .catch((error) => {
        setDescription(error.Description);
      });
  }

  return (
    <>
      <div className="request-card">
        <h3>Request Seat</h3>
        <form onSubmit={handleSubmit}>
          <label for="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            class="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ height: "20px", width: "100%" }}
            required
          />
          <label for="fromTime">From Time</label>
          <input
            type="time"
            id="fromTime"
            name="fromTime"
            class="form-control"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            style={{ height: "20px", width: "100%" }}
            required
            step="3600"
          />
          <label for="toTime">To Time</label>
          <input
            type="time"
            id="toTime"
            name="toTime"
            class="form-control"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            step="3600"
            style={{ height: "20px", width: "100%" }}
            required
          />
          <label for="location">Location</label>
          <GetLocation
            flagBooking={lFlag}
            setFlagBooking={setLFlag}
            onLocationChange={setLocationId}
            locationId={locationId}
          />
          <label for="location">Description</label>
          <textarea
            className="form-control"
            placeholder="Please provide your role along with purpose"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            style={{ width: "100%" }}
            required
          />
          <span className="request-card-center">
            <button type="submit">Request</button>
            &nbsp;&nbsp;
            <button onClick={onClose}>Close</button>
          </span>
        </form>
        {message && <span>{message}</span>}
      </div>
    </>
  );
};

export default RequestAccessSeat;
