import {useState } from "react";
import UpcomingBooking from "./UpcomingBooking";
import GetSeat from "./GetSeat";
import CompletedBooking from "./CompletedBooking";

const Home = () => {
  const [countall, setCountAll] = useState(0);
  const [countAvailable, setCountAvailable] = useState(0);
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [seatName, setSeatName] = useState("");
  const [seatId, setSeatId] = useState("");
  const [message, setMessage] = useState("");
  const [openBooking, setOpenBooking] = useState(true);
  const header = "Bearer " + sessionStorage.getItem("accessToken");
  const [flag, setFlag] = useState(false);
  const location = sessionStorage.getItem("UserLocation");
  const [locationId, setLocationId] = useState(null);
  const handleBooking = () => {
    const bookingDetail = {
      location_id: locationId,
      user_id: sessionStorage.getItem("userId"),
      seat_id: seatId,
      date: date,
      fromTime: fromTime,
      toTime: toTime,
    };
    fetch(`http://localhost:8081/api/booking/`, {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: header },
      body: JSON.stringify(bookingDetail),
    }).then((res) => {
      if (!res.ok) {
        throw Error("failed to book seat");
      }
      setFlag(!flag);
      setMessage("You Have Booked A seat: " + seatName + " on " + date + ".");
    });
  };
  if(location!==null){
    setLocationId(location.id)
  }
  return (
    <>
      <div className="container">
        <div className="container-content">
          <div className="row">
            <div className="row-card">
              <div className="row-card-title">
                <span className="btn-group">
                  <button
                    onClick={() => {
                      setOpenBooking(!openBooking);
                    }}
                  >
                    <h3>Upcoming Booking</h3>
                  </button>
                  <button
                    onClick={() => {
                      setOpenBooking(!openBooking);
                    }}
                  >
                    <h3>Completed Booking</h3>
                  </button>
                </span>
              </div>
              <div className="row-card-body">
                <table className="header-booking">
                  <tr>
                    <th>Date</th>
                    <th>Seat Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    {openBooking && <th>Cancel</th>}
                    
                  </tr>
                </table>
                <div className="table-scroll">
                  {openBooking && (
                    <UpcomingBooking flag={flag} setFlag={setFlag} />
                  )}
                  {!openBooking && (
                    <CompletedBooking flag={flag} setFlag={setFlag} />
                  )}
                </div>
              </div>
            </div>
            <div className="row-card">
              <div className="row-card-title">
                <h3>Book Seats</h3>
              </div>
              <div className="card-body">
                <div className="cards-body-col">
                  <div className="form-container">
                    <span>{message}</span>
                    <form className="modal-form">
                      <div className="form-item">
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                          min={new Date().toISOString().split("T")[0]} // Set minimum date to today
                        />
                      </div>
                      <div class="form-item">
                        <input
                          type="time"
                          id="time"
                          name="time"
                          class="form-control"
                          value={fromTime}
                          onChange={(e) => {
                            setFromTime(e.target.value);
                          }}
                          required
                          step="3600"
                        />
                      </div>
                      <div class="form-item">
                        <input
                          type="time"
                          id="time"
                          name="time"
                          class="form-control"
                          value={toTime}
                          onChange={(e) => {
                            setToTime(e.target.value);
                          }}
                          required
                          step="3600"
                        />
                      </div>

                      {/* <div className="form-item">
                        {locationId && <Layout locationId={locationId} />}
                      </div> */}
                    </form>
                  </div>
                </div>
                <div className="card-body-col">
                  <div className="seat-display">
                    {locationId && (
                      <GetSeat
                        setFlag={setFlag}
                        flag={flag}
                        date={date}
                        locationId={location.id}
                        fromTime={fromTime}
                        toTime={toTime}
                        seatId={seatId}
                        setSeatId={setSeatId}
                        setSeatName={setSeatName}
                        setCountAvailable={setCountAvailable}
                        setCountAll={setCountAll}
                      />
                    )}
                  </div>
                  <div className="seat-book-item">
                    <p>
                      {!date && !locationId && (
                        <span>
                          Welcome To Accolite Digital. Please Book Your Seat.
                        </span>
                      )}
                      {date && locationId && seatName && (
                        <span style={{ color: "#3f4d67" }}>
                          &diams; You have selected {seatName} for {date}
                        </span>
                      )}
                    </p>
                    {date && locationId && (
                      <p style={{}}>
                        <span style={{ color: "red" }}>Available:</span>
                        <span style={{ color: "#3f4d67" }}>
                          {countAvailable} &#8725;{countall}
                        </span>
                      </p>
                    )}
                    {date && locationId && seatName && (
                      <button className="button-group" onClick={handleBooking}>
                        Book Seat
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
