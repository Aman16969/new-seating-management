import { useState, useEffect } from "react";
import {
  MdEdit,
  MdDelete,
  MdAdd,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
} from "react-icons/md";
import AddSeatPopUp from "./AddSeatPopUp";

const AdminSeat = ({ location, row, col }) => {
  const [seat, setSeat] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [name, setName] = useState("");
  const [add, setAdd] = useState(false);
  const [addPopUp, setAddPopUp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const[flag,setFlag]=useState(true)
  


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
        console.log(data);
   
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [flag]);

  const onHandleAdd = (name) => {
    console.log(name);
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
        setAddPopUp(false)
        setFlag(!flag)
      
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const onHandleCancelPopUp= () =>{
    console.log("cancel");
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
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
    setIsDeleting(false);
    
  };

  const handleCancel= () => {
   
    setIsEditing(false);
    window.location.reload();
  }

  const handleEdit = (e) => {
    console.log(name);
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
        setFlag(!flag)
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
      setIsEditing(true)
  };

  return (
    <>
      <>
        {seat && seat.isAvailable !== 0 && (
          <div className="seatDiv">
            <div>
              {seat.seatDirection === 0 && (
                <MdOutlineArrowUpward size={"20px"} />
              )}
              {seat.seatDirection === 1 && (
                <MdOutlineArrowDownward size={"20px"} />
              )}
              <MdEdit size={"20px"} onClick={() => setIsEditing(true)} />
              <MdDelete size={"20px"} onClick={() => setIsDeleting(true)} />
            </div>
          </div>
        )}

        {isEditing ? (
           <>
           <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button onClick={()=>handleEdit()}>Save</button>
            <button onClick={() =>handleCancel() }>Cancel</button>
           </>
        ) : (
          <>
            <p>{name}</p>
          </>
        )}

        {isDeleting && (
          <div className="popup">
            <p>Are you sure you want to delete?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setIsDeleting(false)}>No</button>
          </div>
        )}
        {seat && seat.isAvailable === 0 && (
          <>
            {!add && (
              <div className="seatDiv">
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
    </>
  );
};

export default AdminSeat;
