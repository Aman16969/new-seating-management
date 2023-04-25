import { useState, useEffect } from "react";
import "./home.css";

const DisplaySeat = ({ location, row, col, status, selected,flag,setFlag }) => {
  const [seat, setSeat] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [name, setName] = useState(null);

  // console.log(location.id+"R"+row+"C"+col, status);

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
        setFlag(!flag)
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [flag]);

  return (
    <>
      <div>
        {seat &&
          seat.isAvailable === 1 &&
          status &&
          selected === seat.seatId && (
            <div
              className="display-seat"
              style={{
                color: "black",
                backgroundColor: "#ADFF2F",
                borderTop: "1px solid red",
                borderBottom: "5px solid red",
                borderLeft: "5px solid red",
                borderRight: "5px solid red",
              }}
            >
              {seat.seatName}
            </div>
          )}
        {seat &&
          seat.isAvailable === 1 &&
          status &&
          selected !== seat.seatId && (
            <div
              className="display-seat"
              style={{
                color: "black",
                backgroundColor: "#ADFF2F",
                borderTop: "1px solid black",
                borderBottom: "5px solid black",
                borderLeft: "5px solid black",
                borderRight: "5px solid black",
              }}
            >
              {seat.seatName}
            </div>
          )}
        {seat && seat.isAvailable === 1 && !status && (
          <div
            className="display-seat"
            style={{
              color: "black",
              backgroundColor: "#FF3333",
              borderTop: "1px solid black",
              borderBottom: "5px solid black",
              borderLeft: "5px solid black",
              borderRight: "5px solid black",
            }}
          >
            {seat.seatName}
          </div>
        )}
        {seat && seat.isAvailable === 0 && (
          <div className="display-seat" style={{}}>
            {"  "}
          </div>
        )}
      </div>
    </>
  );
};

export default DisplaySeat;
