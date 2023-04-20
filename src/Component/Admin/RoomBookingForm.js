import { use } from "@js-joda/core";
import { useState } from "react";
import Location from "./Location";
import BookingRoom from "./BoardRoom";
const OpenBookingForm = () => {
  const [isOpenCon, setIsOpenCon] = useState(true);
  const [date, setDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [admin, setadmin] = useState(null);
  const [user, setUser] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [boardRoom_id, setBoardRoomId] = useState(null);

  return (
    <>
      {isOpenCon && (
        <div className="popupContainer">
          <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
            <div className="popupHeader">
              <h2>Book</h2>
            </div>
            <form className="booking-form">
              <div class="form-group">
                <label for="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  class="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div class="form-group">
                <label for="fromTime">From Time:</label>
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
              </div>

              <div class="form-group">
                <label for="toTime">To Time:</label>
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
              </div>

              <div class="form-group">
                <label for="location">Location:</label>
                <Location locationId={locationId} setLocationId={setLocationId} />
              </div>
              <div class="form-group">
                <label for="boardRoom_id">Board Room ID:</label>
                <BookingRoom/>
              </div>

              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenBookingForm;
