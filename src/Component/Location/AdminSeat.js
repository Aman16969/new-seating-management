import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdAdd, MdOutlineArrowDownward, MdOutlineArrowUpward} from "react-icons/md";
import AddSeatPopUp from "./AddSeatPopUp";

const AdminSeat = ({ location, row, col }) => {
  const [seat, setSeat] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [name, setName] = useState(null);
  const [add, setAdd] = useState(false);
  const [addPopUp, setAddPopUp] = useState(false);

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

  const onHandleAdd = (name) => {
    console.log(name)
    const seat = { row: row, col: col, locationId: location.id, name: name };
    fetch(`http://localhost:8081/api/seat/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(seat),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
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

  const onHandleCancelPopUp= () =>{
    console.log("cancel");
    setAddPopUp(false);
  }

  const onHandleDelete = () => {
    fetch(`http://localhost:8081/api/seat/${seat.seatId}/${false}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(seat),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
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

  return (
    <>
      <>
        {seat && seat.isAvailable !== 0 && (
          <div className="seatDiv">
            {/* <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button onClick={() => onHandleAdd()}>Edit</button>
            <button onClick={() => onHandleDelete()}>Delete</button> */}
            <div>
              {seat.seatDirection === 0 && <MdOutlineArrowUpward size={"20px"}/>}
              {seat.seatDirection === 1 && <MdOutlineArrowDownward size={"20px"}/>}
              <MdOutlineArrowUpward size={"20px"}/>
              <MdEdit size={"20px"}/>
              <MdDelete size={"20px"}/>
            </div>
            <p>{name}</p>
          </div>
        )}

        {seat && seat.isAvailable === 0 && (
          <>
            {!add && (
              <div className="seatDiv">
                {/* <button onClick={() => setAdd(true)}>Add</button> */}
                <div className="addBtn"><MdAdd size={"20px"} onClick={()=>{setAddPopUp(!addPopUp)}}/></div>
                {addPopUp && <AddSeatPopUp name={""} onHandleAdd={onHandleAdd} onHandleCancel={onHandleCancelPopUp}/>}
              </div>
            )}
            {add && (
              <div className="seatDiv">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <button onClick={() => onHandleAdd()}>Save</button>
              </div>
            )}
          </>
        )}
      </>
      {/* <>
      <div className="seat-display">
        {seat && seat.isAvailable === 1 && <div className="seat">{seat.seatName}</div>}
        {seat && seat.isAvailable === 0 && <h1>{" "}</h1>}
        </div>
      </> */}
    </>
  );
};

export default AdminSeat;
