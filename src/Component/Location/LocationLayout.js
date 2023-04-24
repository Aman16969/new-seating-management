import { useState, useEffect } from "react";
import AdminSeat from "./AdminSeat";
import "./location.css";

const LocationLayout = ({ location }) => {
  console.log(location);
  const [rows, setRows] = useState(location.rs);
  const [cols, setCols] = useState(location.cs);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");

  const updateRowsAndCols = () => {
    fetch(
      `http://localhost:8081/api/location/updateRowAndColumn?location=${location.id}&row=${rows}&column=${cols}`,
      {
        method: "PUT",
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
        window.location.reload();
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const rs = [];
  for (let i = 1; i <= location.rs; i++) {
    const cs = [];
    for (let j = 1; j <= location.cs; j++) {
      cs.push(
        <td>
          <h3>{<AdminSeat location={location} row={i} col={j} />}</h3>
        </td>
      );
    }
    rs.push(<tr>{cs}</tr>);
  }
  return (
    <div>
      {/* <h1>{location.name}</h1> */}
      <div className="location-rc">
        Rows:{" "}
        <input
          type="number"
          value={rows}
          onChange={(e) => {
            setRows(e.target.value);
          }}
        />
        Columns:{" "}
        <input
          type="number"
          value={cols}
          onChange={(e) => {
            setCols(e.target.value);
          }}
        />
        <button
          onClick={() => {
            updateRowsAndCols();
          }}
        >
          Update Layout
        </button>
      </div>
      <div className="location-scroll">
        <table className="locationLayout">{rs}</table>
      </div>
    </div>
  );
};

export default LocationLayout;
