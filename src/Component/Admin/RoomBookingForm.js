import { use } from "@js-joda/core";
import { useState } from "react";
import Location from "./Location";
import BookingRoom from "./BoardRoom";
import Room from "./Room";
const OpenBookingForm = (props) => {
  const [isOpenCon, setIsOpenCon] = useState(true);
  const [date, setDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [admin, setadmin] = useState(null);
  const [user, setUser] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [roomType, setRoomType] = useState("");
  const handleSubmit=(e)=>{
    e.preventDefault();
    const data={ "date":date,
    "fromTime":fromTime,
    "toTime":toTime,
    "adminEmail":sessionStorage.getItem("email"),
    "userEmail":props.userEmail,
    "roomType":roomType,
    "location_id":parseInt(locationId),
    "room_id":parseInt(roomId)
    }
    console.log(data)
    const header = "Bearer " + sessionStorage.getItem("accessToken");
        fetch(`http://localhost:8081/api/bookRoom/`, {
          method:'POST',
          headers: {
            "Content-type": "application/json",
            Authorization: header,
          },
          body:JSON.stringify(data)
        })
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then((data)=>{
            props.setOpenBookingForm(false)
          })
          .catch((error) => {
            console.log(error)
          });
  }
  return (
    <>
      {isOpenCon && (
        <div className="popupContainer">
          <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
            <div className="popupHeader">
              <h2>Book</h2>
            </div>
            <form className="booking-form" onSubmit={handleSubmit}>

                <label for="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  class="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              

             
                <label for="fromTime">From Time</label>
                <input
                  type="time"
                  id="fromTime"
                  name="fromTime"
                  class="form-control"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  required
                  step="3600"
                />
             

              
                <label for="toTime">To Time</label>
                <input
                  type="time"
                  id="toTime"
                  name="toTime"
                  class="form-control"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  required
                  step="3600"
                />
              

              
                <label for="location">Location</label>
                <Location
                  locationId={locationId}
                  setLocationId={setLocationId}
                />
              
              
                <label for="RoomType">Room Type</label>
                <select
                  className="drop-select"
                  name="select"
                  id="select"
                  value={roomType}
                  onChange={(e) => {
                    setRoomType(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select Room Type
                  </option>
                  <option value="Board Room">Board Room</option>
                  <option value="Confrence Room">Confrence Room</option>
                </select>
              
              {locationId && <div class="form-group">
                <label for="RoomType">Room</label>
                <Room roomId={roomId} locationId={locationId} setRoomId={setRoomId}/>
              </div>}
              

             <button>Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenBookingForm;
