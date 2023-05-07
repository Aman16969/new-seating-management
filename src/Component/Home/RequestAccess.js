import React, { useEffect, useState } from "react";

function RequestAccess({ onClose, ...props }) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [roomType, setRoomType] = useState("available");
  const [capacity,setCapacity]=useState(0)

  const email = sessionStorage.getItem("email");
  const token = "Bearer " + sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (description === "Your request has been sent successfully!") {
      window.location.reload();
    }
  }, [description]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      email,
      description,
      date,
      capacity,
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
        <label for="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          class="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ height: "20px", width: "90%" }}
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
          style={{ height: "20px", width: "90%" }}
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
          required
          step="3600"
          style={{ height: "20px", width: "90%" }}
        />
        <label for="toTime">Capacity</label>
        <input
          type="number"
          id="toTime"
          name="toTime"
          class="form-control"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          style={{ height: "20px", width: "90%" }}
        />
        <label for="RoomType">Room Type</label>
        <select
          className="drop-select"
          name="select"
          id="select"
          style={{ height: "30px", width: "90%" }}
          value={roomType}
          onChange={(e) => {
            setRoomType(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Room Type
          </option>
          <option value="Board Room">Any Available</option>
          <option value="Board Room">Board Room</option>
          <option value="Confrence Room">Confrence Room</option>
        </select>
        <textarea
          className="form-control"
          placeholder="Please provide your role along with purpose"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          style={{  width: "90%" }}
        />
        <span className="request-card-center">
          <button type="submit">Request</button>
          &nbsp;&nbsp;
          <button onClick={onClose}>Close</button>
        </span>{" "}
      </form>
      
    </div>
  );
}

export default RequestAccess;
