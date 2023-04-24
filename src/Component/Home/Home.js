import {useState, useEffect } from "react";
import UpcomingBooking from "./UpcomingBooking";
import GetSeat from "./GetSeat";
import CompletedBooking from "./CompletedBooking";
import RequestAccess from "../Admin/RequestAccess";
import DisplayLayout from "./DisplayLayout";

const Home = () => {
  const [countall, setCountAll] = useState(0);
  const [countAvailable, setCountAvailable] = useState(0);
  const [date, setDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [seatName, setSeatName] = useState("");
  const [seatId, setSeatId] = useState("");
  const [message, setMessage] = useState("");
  const [openBooking, setOpenBooking] = useState(true);
  const header = "Bearer " + sessionStorage.getItem("accessToken");
  const [flag, setFlag] = useState(false);
  const locationId = sessionStorage.getItem("userLocationId");
  const [showModal,setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [seatAvailability, setSeatAvailability] = useState(null);
  const token = sessionStorage.getItem("accessToken");

  useEffect((e) => {
    fetch(`http://localhost:8081/api/booking/available/locationDateTime?date=${date}&fromTime=${fromTime}&toTime=${toTime}&location=${locationId}`, {
      method: "GET",
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
        setSeatAvailability(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [date, fromTime, toTime]);

  useEffect((e) => {
    fetch(`http://localhost:8081/api/location/${locationId}`, {
      method: "GET",
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
        setLocation(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  function handleAccessClick() {
    setShowModal(true);
  }
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
  if (location !== null) {
    setLocationId(location.id);
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
              <div className="row-card-title" style={{display: 'flex',
  justifyContent: 'space-around',flexDirection: 'row'}}>
                <div>
                  <h3>Book Seats</h3>{" "}
                </div>
                <div>
                  <button className="access" onClick={handleAccessClick}>
                    Request Access
                  </button>
                </div>
              </div>

              {showModal && (
                <RequestAccess
                  setShowModal={setShowModal}
                  onClose={() => setShowModal(false)}
                />
              )}
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
                    </form>
                  </div>
                </div>
                {location && !seatAvailability && <DisplayLayout location={location}></DisplayLayout>}
                {location && seatAvailability && <DisplayLayout location={location} seatAvailability={seatAvailability}></DisplayLayout>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
