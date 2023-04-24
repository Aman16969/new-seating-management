import { useState, useEffect } from "react";
//import "./Admin.css";

const DisplaySeat = ({ location, row, col, status }) => {
  const [seat, setSeat] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [name, setName] = useState(null);

  useEffect((e) => {
    fetch(
      `http://localhost:8081/api/seat/position?location=${location.id}&row=${row}&column=${col}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setSeat(data);
        setName(data.seatName);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <div>
        {seat && seat.isAvailable === 1 && status && <div className="display-seat" style={{color:"green"}}>{seat.seatName}</div>}
        {seat && seat.isAvailable === 0 && <h1>{" "}</h1>}
        </div>
    </>
  );
};

export default DisplaySeat;
