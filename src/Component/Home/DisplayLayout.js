import { useState, useEffect } from "react";
import DisplaySeat from "./DisplaySeat";

const DisplayLayout = ({ location, map:seatAvailability }) => {
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
    const [status, setStatus] = useState(false);

    console.log(seatAvailability);
    const rows = [];
    for (let i = 1; i <= location.rs; i++) {
      const cols = [];
      for (let j = 1; j <= location.cs; j++) {
        cols.push(
          <td>
            <h3>{<DisplaySeat location={location} row={i} col={j} status={status}/>}</h3>
          </td>
        );
      }
      rows.push(<tr>{cols}</tr>);
    }
    return (
      <>
        <h1>{location.name}</h1>
        <table>{rows}</table>
      </>
    );
  
};

export default DisplayLayout;
