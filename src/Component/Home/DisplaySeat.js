import { useState, useEffect } from "react";
import "./home.css";

const DisplaySeat = ({
  location,
  row,
  col,
  status,
  selected,
  flag,
  setFlag,
}) => {
  const [seat, setSeat] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [name, setName] = useState(null);

  // console.log(location.id+"R"+row+"C"+col, status);

  useEffect(
    (e) => {
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
          setFlag(!flag);
        })
        .catch((error) => {
          setError(error.message);
        });
    },
    [flag]
  );

  return (
    <>
      <div>
        {seat &&
          seat.isAvailable === 1 &&
          status &&
          selected === seat.seatId &&
          seat.seatDirection === 0 && (
            <div
              className="display-seat"
              style={{
                color: "black",
                backgroundImage: "linear-gradient( #28fa54, #97fcac)",
                borderTop: "5px solid red",
                borderBottom: "1px solid red",
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
          selected !== seat.seatId &&
          seat.seatDirection === 0 && (
            <div
              className="display-seat"
              style={{
                color: "black",
                backgroundImage: "linear-gradient( #28fa54, #97fcac)",
                borderTop: "5px solid black",
                borderBottom: "1px solid black",
                borderLeft: "5px solid black",
                borderRight: "5px solid black",
              }}
            >
              {seat.seatName}
            </div>
          )}
        {seat &&
          seat.isAvailable === 1 &&
          !status &&
          seat.seatDirection === 0 && (
            <div
              className="display-seat"
              style={{
                color: "black",
                backgroundColor: "rgb(150,150,150)",
                borderTop: "5px solid black",
                borderBottom: "1px solid black",
                borderLeft: "5px solid black",
                borderRight: "5px solid black",
              }}
            >
              {seat.seatName}
            </div>
          )}
        {seat &&
          seat.isAvailable === 1 &&
          status &&
          selected === seat.seatId &&
          seat.seatDirection === 1 && (
            <div
              className="display-seat"
              style={{
                color: "white",
                backgroundImage: "linear-gradient(#170404, rgb(100 83 57))",
                borderTop: "2px solid red",
                borderBottom: "7px solid red",
                borderLeft: "5px solid red",
                borderRight: "5px solid red",
                borderStyle: "inset",
              }}
            >
              {seat.seatName}
            </div>
          )}
        {seat &&
          seat.isAvailable === 1 &&
          status &&
          selected !== seat.seatId &&
          seat.seatDirection === 1 && (
            <div
              className="display-seat"
              style={{
                color: "black",
                // backgroundColor: "#ADFF2F",
                backgroundImage: "linear-gradient( #97fcac, #28fa54)",
                borderTop: "1px solid black",
                borderBottom: "5px solid black",
                borderLeft: "5px solid black",
                borderRight: "5px solid black",
                borderStyle: "inset",
              }}
            >
              {seat.seatName}
            </div>
          )}
        {seat &&
          seat.isAvailable === 1 &&
          !status &&
          seat.seatDirection === 1 && (
            <div
              className="display-seat"
              style={{
                color: "white",
                backgroundColor: "rgb(150,150,150)",
                borderStyle: "inset",
                borderWidth: "0px 4px 7px",
                borderColor: "#02070a",
                cursor: "pointer",
              }}
            >
              {seat.seatName}
            </div>
          )}
        {seat && seat.isAvailable === 0 && (
          <div className="display-seat" style={{}}></div>
        )}
      </div>
    </>
  );
};

export default DisplaySeat;
