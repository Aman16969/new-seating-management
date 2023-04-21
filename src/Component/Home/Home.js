import { useEffect, useState } from "react";
import GetLocation from "./GetLocation";
import UpcomingBooking from "./UpcomingBooking";
import GetSeat from "./GetSeat";
import Layout from "./Layout";
import CompletedBooking from "./CompletedBooking";
const Home = () => {
  const [countall, setCountAll] = useState(0);
  const [countAvailable, setCountAvailable] = useState(0);
  const [locationId, setLocationId] = useState(null);
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [seatName, setSeatName] = useState("");
  const [seatId, setSeatId] = useState("");
  const [message, setMessage] = useState("");
  const [flagBooking, setFlagBooking] = useState(false);
  const [location, setLocation] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const header = "Bearer " + sessionStorage.getItem("accessToken");
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    fetch(`http://localhost:8081/api/user/${userId}`, {
      headers: { "content-type": "application/json", Authorization: header },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("failed to book seat");
        }
        return res.json();
      })
      .then((data) => {
        setLocation(data.location);
        setLocationId(location.id);
      });
  }, []);

  const handleBooking = () => {
    const bookingDetail = {
      location_id: locationId,
      user_id: sessionStorage.getItem("userId"),
      seat_id: seatId,
      date: date,
      fromTime: fromTime,
      toTime: toTime,
    };
    console.log(bookingDetail);
    fetch(`http://localhost:8081/api/booking/`, {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: header },
      body: JSON.stringify(bookingDetail),
    }).then((res) => {
      if (!res.ok) {
        throw Error("failed to book seat");
      }
      setMessage("You Have Booked A seat: " + seatName + " on " + date + ".");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };
  return (
    <>
      <div className="container">
        <div className="container-content">
          <div className="row">
            <div className="row-card">
              <span className="btn-group">
                <button>
                  <h3>Upcoming Booking</h3>
                </button>
                <button>
                  <h3>Completed Booking</h3>
                </button>
              </span>
              <div className="row-card-body">
                <table>
                  <tr className="header-booking">
                    <th>Date</th>
                    <th>Seat Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Cancel</th>
                  </tr>
                </table>
                <div className="table-scroll">
                  <UpcomingBooking
                    setFlagBooking={setFlagBooking}
                    flagBooking={flagBooking}
                  />
                  <CompletedBooking
                    setFlagBooking={setFlagBooking}
                    flagBooking={flagBooking}
                  />
                </div>
              </div>
            </div>
            <div className="row-card">
              <div className="row-card-title">
                <h2>Book Seats</h2>
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
                      {/* <div className="form-item">
                        <GetLocation
                          setFlagBooking={setFlagBooking}
                          flagBooking={flagBooking}
                          locationId={locationId}
                          onLocationChange={setLocationId}
                        />
                      </div> */}
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
                    <GetSeat
                      setFlagBooking={setFlagBooking}
                      flagBooking={flagBooking}
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
                    {/* <img src={seat} alt="" className="seat-display-img"/>  */}
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
