import React, { useEffect, useState } from "react";

function RequestAccess({ onClose, ...props }) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [roomType, setRoomType] = useState("any Available");
  const [capacity,setCapacity]=useState(0)
  const email = sessionStorage.getItem("email");
  const token = "Bearer " + sessionStorage.getItem("accessToken");
  const[message,setMessage]=useState("")


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
          setMessage("Your request has been sent successfully!")
          props.setRFlag(!props.rFlag)
      setTimeout(()=>{
        onClose();
        setMessage("")
      },1500)
        } else {
          throw new Error("failed to send request");
        }
        
      })
      .catch((error) => {
        setDescription(error.Description);
      });
  };

  return (<>
    
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
        <label for="toTime">Capacity</label>
        <input
          type="number"
          id="toTime"
          name="toTime"
          class="form-control"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          
          style={{ height: "20px", width: "100%" }}
          required
        />
        <label for="RoomType">Room Type</label>
        <select
          className="drop-select"
          name="select"
          id="select"
          style={{ height: "30px", width: "100%" }}
          value={roomType}
          onChange={(e) => {
            setRoomType(e.target.value);
          }}
          required
        >
          <option value="" disabled>
            Select Room Type
          </option>
          <option value="Any Available">Any Available</option>
          <option value="Board Room">Board Room</option>
          <option value="Confrence Room">Confrence Room</option>
        </select>
        <textarea
          className="form-control"
          placeholder="Please provide your role along with purpose"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          style={{  width: "100%" }}
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
}

export default RequestAccess;
