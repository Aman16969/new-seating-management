import { useState, useEffect } from "react";
import {
  MdEdit,
  MdDelete,
  MdAdd,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
} from "react-icons/md";
import { BsSaveFill } from 'react-icons/bs';


import AddSeatPopUp from "./AddSeatPopUp";

const AdminSeat = ({ location, row, col }) => {
  const [seat, setSeat] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [add, setAdd] = useState(false);
  const [addPopUp, setAddPopUp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
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
  }, [flag]);

  const onHandleAdd = (name) => {
    const seat = { row: row, col: col, locationId: location.id, name: name, dir:1 };
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
        setAddPopUp(false);
        setFlag(!flag);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const onHandleCancelPopUp = () => {
    setAddPopUp(false);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8081/api/seat/${seat.seatId}/${false}`, {
      method: "PUT",
      headers: {
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
        setIsDeleting(false);
        setFlag(!flag);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleCancel= () => {
    setIsEditing(false);
    setIsDeleting(false);
  }

  const handleEdit = (e) => {
    const seat = { row: row, col: col, locationId: location.id, name: name, dir:seat.seatDirection };
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
        setFlag(!flag)
        setIsEditing(false)
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleChangeDirection = () =>{
    fetch(`http://localhost:8081/api/seat/changeDirection/${seat.seatId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setFlag(!flag)
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  }

  return (
    <>
      <>
        {seat && seat.isAvailable !== 0 && (
          <div className="seatDiv">
            <div>
              {seat.seatDirection === 0 && (
                <MdOutlineArrowUpward size={"20px"} onClick={()=>handleChangeDirection()}/>
              )}
              {seat.seatDirection === 1 && (
                <MdOutlineArrowDownward size={"20px"} onClick={()=>handleChangeDirection()}/>
              )}
              <MdEdit size={"20px"} onClick={() => setIsEditing(true)} />
              <MdDelete size={"20px"} onClick={() => setIsDeleting(true)} />
            </div>
          </div>
        )}

        {isEditing ? (
          <>
            <div className="locationpopupContainer">
              <div className="location-popup-boxd">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              
                <button  onClick={() => handleEdit()}>Save</button>
                <button  onClick={() => handleCancel()}>Cancel</button>
               
              </div>
            </div>
          </>
        ) : (
          <>
            <p>{name}</p>
          </>
        )}

        {isDeleting && (
          <div className="locationpopupContainer">
            <div className="location-popup-boxd">
              <p>Are you sure you want to delete?</p>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setIsDeleting(false)}>No</button>
            </div>
          </div>
        )}
        {seat && seat.isAvailable === 0 && (
          <>
            {!add && (
              <div className="seatDiv">
                <div className="addBtn">
                  <MdAdd
                    size={"20px"}
                    onClick={() => {
                      setAddPopUp(!addPopUp);
                    }}
                  />
                </div>
                {addPopUp && (
                  <AddSeatPopUp
                    name={""}
                    onHandleAdd={onHandleAdd}
                    onHandleCancel={onHandleCancelPopUp}
                  />
                )}
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
    </>
  );
};

export default AdminSeat;
