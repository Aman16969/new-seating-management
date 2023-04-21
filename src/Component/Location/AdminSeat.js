import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";

const AdminSeat = ({ location, row, col }) => {
  const [seat, setSeat] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [name, setName] = useState(null);
  const [add, setAdd] = useState(null);

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
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const onHandleAdd = () => {
    const seat = { row: row, col: col, locationId: location.id, name: name };
    fetch(`http://localhost:8081/api/seat/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(seat)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setSeat(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      {seat && seat.isAvailable === 0 && (
        <>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
          />
          <button>Add</button>
        </>
      )}
    </>
  );
};

export default AdminSeat;
