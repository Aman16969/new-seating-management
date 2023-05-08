import { useState, useEffect } from "react";
import AdminSeat from "./AdminSeat";
import "./location.css";
import AddConference from "./AddConference";

const LocationLayout = ({ location, flag }) => {
  const [rows, setRows] = useState(location.rs);
  const [cols, setCols] = useState(location.cs);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [addRoom, setAddRoom] = useState(false);
  const [roomName, setRoomName] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [type, setType] = useState("BOARD");
  const [openExistRoomPopup, setExistingRoomPopup] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [rflag, setRFlag] = useState(false);
  const[lflag,setLFlag]=useState(false)

    const rs = [];
    for (let i = 1; i <= location.rs; i++) {
      const cs = [];
      for (let j = 1; j <= location.cs; j++) {
        cs.push(
          <td>
            <h3>
              {<AdminSeat location={location} row={i} col={j} refresh={flag} />}
            </h3>
          </td>
        );
      }
      rs.push(<tr>{cs}</tr>);
    }

  useEffect(() => {
    setRows(location.rs);
    setCols(location.cs);
  }, [location,lflag]);
  useEffect(() => {
    fetch(`http://localhost:8081/api/room/location/${location.id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw error("error");
        }
        return res.json();
      })
      .then((data) => {
        setRoomData(data);
      });
  }, [rflag]);

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
        return response.json();
      })
      .then((data) => {
        window.location.reload()

      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleAddRoom = () => {
    const room = {
      name: roomName,
      capacity: capacity,
      roomType: type,
      location: location,
    };
    console.log(room);
    fetch(`http://localhost:8081/api/room/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(room),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAddRoom(false);
        setRFlag(!flag);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  

  return (
    <div>
      {openExistRoomPopup && (
        <div
          className="popupContainer"
          onClick={() => setExistingRoomPopup(false)}
        >
          <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
            <div className="popupHeader">
              <h2>Board /Conference Room</h2>
            </div>
            <div>
              <table className="header-booking" style={{border:'1px solid blue'}}>
                <thead className="header-booking" style={{border:'1px solid blue'}}>
                  <tr >
                    <th>Room Type</th>
                    <th>Room Name</th>
                    <th>Capacity</th>
                  </tr>
                </thead>
                </table>
                <div className="table-scroll-1">
                  <table className="header-booking">
                    <tbody className="header-booking" style={{textAlign:'center',border:'1px solid blue'}}>
                      {roomData &&
                        roomData.map((room) => {
                          return (
                            <tr >
                              <td>{room.roomType}</td>
                              <td>{room.name}</td>
                              <td>{room.capacity}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              
            </div>
          </div>
        </div>
      )}
      {addRoom && (
        <div className="popup">
          <table>
            <tr>
              <td>Room Name: </td>
              <td>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Seating Capacity: </td>
              <td>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Room Type:</td>
              <td>
                <select
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="BOARD">Board Room</option>
                  <option value="DISCUSSION">Discussion Room</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    setAddRoom(false);
                  }}
                >
                  Cancel
                </button>
              </td>
              <td>
                <button
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleAddRoom()}
                >
                  Add Room
                </button>
              </td>
            </tr>
          </table>
        </div>
      )}

      <div className="location-rc">
        <b>Rows:</b>{" "}
        <input
          type="number"
          value={rows}
          onChange={(e) => {
            setRows(e.target.value);
          }}
        />
        <b>Columns:</b>{" "}
        <input
          type="number"
          value={cols}
          onChange={(e) => {
            setCols(e.target.value);
          }}
        />
        <button
          className="button-group"
          onClick={() => {
            updateRowsAndCols();
          }}
        >
          Update Layout
        </button>
        <button
          className="button-group"
          onClick={() => {
            setAddRoom(true);
          }}
        >
          Add Board Room / Discussion Room
        </button>
        <button
          className="button-group"
          onClick={() => {
            setExistingRoomPopup(true);
          }}
        >
          View Rooms
        </button>
      </div>
      <div className="location-scroll">
        <table className="locationLayout">{rs}</table>
      </div>
    </div>
  );
};

export default LocationLayout;
