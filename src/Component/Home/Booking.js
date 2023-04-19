import { useState, useEffect } from "react";
import SeatsLayout from "./SeatsLayout";

const Booking = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const email = sessionStorage.getItem("email");
  const token = "Bearer "+sessionStorage.getItem("accessToken");
  const locationId = sessionStorage.getItem("locationId");
  const [seats, setSeats] = useState(null);
  const [seatAvailability, setSeatAvailability] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/seat/location/'+locationId, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Response not received");
        }
        return res.json();
      })
      .then((data) => {
        setSeats(data);
      })
      .catch((err) => {
        
      });
  }, []);

  const onClickFetchSeats = () =>{
    console.log("Hello", fromDate, toDate);
    fetch(`http://localhost:8081/api/booking/available/locationAndDates?location=${locationId}&startDate=${fromDate}&endDate=${toDate}`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Response not received");
        }
        return res.json();
      })
      .then((data) => {
        setSeatAvailability(data);
      })
      .catch((err) => {
        
      });
  }

  return (
    <div className="booking">
      <h1>Book my workspace</h1>
      <div className="dateSelection">
        <input
          type="date"
          name="fromDate"
          id="fromDate"
          value={fromDate}
          onChange={(e) => {
            setFromDate(e.target.value);
          }}
          min={new Date().toISOString().split("T")[0]} // Set minimum date to today
        />

        <input
          type="date"
          name="endDate"
          id="toDate"
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
          }}
          min={new Date().toISOString().split("T")[0]} // Set minimum date to today
        />

        <button onClick={onClickFetchSeats}>Fetch Seats</button>
      </div>
      <div className="layout">
        <h1>Seats</h1>
        {seats && !seatAvailability && <SeatsLayout seats={seats} seatAvailability={seatAvailability}/>}
        {seats && seatAvailability && <SeatsLayout seats={seats} seatAvailability={seatAvailability}/>}
      </div>
      <div className="seatsLayout"></div>
    </div>
  );
};

export default Booking;
