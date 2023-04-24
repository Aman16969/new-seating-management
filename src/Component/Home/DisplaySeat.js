import { useState, useEffect } from "react";


const DisplaySeat = ({ location, row, col }) => {
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
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <div className="seat-display">
        {seat && seat.isAvailable === 1 && <div className="seat">{seat.seatName}</div>}
        {seat && seat.isAvailable === 0 && <h1>{" "}</h1>}
        </div>
    </>
  );
};

export default DisplaySeat;
