import { useState, useEffect } from "react";
import UpcomingBooking from "./UpcomingBooking";
import GetSeat from "./GetSeat";
import CompletedBooking from "./CompletedBooking";
import RequestAccess from "./RequestAccess";
import DisplayLayout from "./DisplayLayout";
import AcceptedRequest from "./AcceptedRequest";
import PendingRequest from "./PendingRequest";
import RequestAccessSeat from "./RequestAccessSeat";

const Home = () => {
  // const [countall, setCountAll] = useState(0);
  // const [countAvailable, setCountAvailable] = useState(0);
  const [date, setDate] = useState(null);
  const [fromTime, setFromTime] = useState("09:30");
  const [toTime, setToTime] = useState("17:30");
  const [message, setMessage] = useState("");
  const [openBooking, setOpenBooking] = useState(true);
  const [openRequest, setOpenRequest] = useState(true);
  const header = "Bearer " + sessionStorage.getItem("accessToken");
  const [flag, setFlag] = useState(true);
  const [rFlag, setRFlag] = useState(true);
  const locationId = sessionStorage.getItem("userLocationId");
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [seats, setSeats] = useState(null);
  const [seatAvailability, setSeatAvailability] = useState(null);
  const token = sessionStorage.getItem("accessToken");

  useEffect(
    (e) => {
      fetch(
        `http://localhost:8081/api/booking/available/locationDateTime?date=${date}&fromTime=${fromTime}&toTime=${toTime}&location=${locationId}`,
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
          // console.log(Object.keys(data).length);
          setSeatAvailability(data);
        
        })
        .catch((error) => {
          setError(error.message);
        });
    },
    [date, fromTime, toTime]
  );

  useEffect(
    (e) => {
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
    },
    [flag]
  );

  useEffect((e) => {
    fetch(`http://localhost:8081/api/seat/location/${locationId}`, {
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
        setSeats(data);
       
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  function handleAccessClick(e) {
    if(e==="1"){
      setShowModal1(true);
    }
    else if(e==="2"){
      setShowModal2(true)
    }
    
  }

  return (
    <>
      <div className="container">
        <div className="container-content">
          <div className="row">
            <div className="row-card" style={{ gridRow: "1 / 2" }}>
              <div className="row-card-title">
                <span className="btn-group">
                  <button
                    onClick={() => {
                      setOpenBooking(true);
                    }}
                  >
                    <h3>Upcoming Booking</h3>
                  </button>
                  <button
                    onClick={() => {
                      setOpenBooking(false);
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
                <div className="table-scroll-1">
                  {openBooking && (
                    <UpcomingBooking flag={flag} setFlag={setFlag} />
                  )}
                  {!openBooking && (
                    <CompletedBooking flag={flag} setFlag={setFlag} />
                  )}
                </div>
              </div>
            </div>
            <div
              className="row-card"
              style={{ gridRow: "2 / 3", height: "190px" }}
            >
              <div className="row-card-title">
                <span className="btn-group">
                  <button
                    onClick={() => {
                      setOpenRequest(true);
                    }}
                  >
                    <h3>Room Bookings</h3>
                  </button>
                  <button
                    onClick={() => {
                      setOpenRequest(false);
                    }}
                  >
                    <h3>Requests</h3>
                  </button>
                </span>
              </div>
              <div className="row-card-body">
                <table className="header-booking">
                  {openRequest && (
                    <tr>
                      <th>Date</th>
                      <th>Room Type</th>
                      <th>Room Number</th>
                      <th>Time</th>
                    </tr>
                  )}
                  {!openRequest && (
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Capacity</th>
                      <th>Room Type</th>
                      <th>Cancel</th>
                    </tr>
                  )}
                </table>

                <div className="table-scroll-2">
                  {openRequest && (
                    <AcceptedRequest rFlag={rFlag} setRFlag={setRFlag} />
                  )}
                  {!openRequest && (
                    <PendingRequest rFlag={rFlag} setRFlag={setRFlag} />
                  )}
                </div>
              </div>
            </div>
            <div
              className="row-card"
              style={{ gridRow: "1 / 3", height: "530px" }}
            >
              <div
                className="row-card-title"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "row",
                }}
              >
                <div>
                  <h3>Book Seats</h3>
                </div>
                <div>
                  <select name="" id="" className="drop-select" onChange={(e)=>handleAccessClick(e.target.value)}>
                  <option value="" disabled selected>Requests</option>
                    <option value="1">Seats</option>
                    <option value="2" >Board/Diccussion Room</option>
                  </select>
                  {/* <button className="access" onClick={handleAccessClick}>
                    Request Board/Discussion Room
                  </button>
                  <button className="access" onClick={handleAccessClick}>
                    Request seats
                  </button> */}
                </div>
                
              </div>

              {showModal2 && (
                <RequestAccess
                  setShowModal={setShowModal2}
                  onClose={() => setShowModal2(false)}
                  rFlag={rFlag}
                  setRFlag={setRFlag}
                />
              )}
              {showModal1 && (
                <RequestAccessSeat
                  setShowModal={setShowModal1}
                  onClose={() => setShowModal1(false)}
                  rFlag={rFlag}
                  setRFlag={setRFlag}
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
                {location && seats && (
                  <DisplayLayout
                    location={location}
                    seats={seats}
                    seatAvailability={seatAvailability}
                    date={date}
                    fromTime={fromTime}
                    toTime={toTime}
                    flag={flag}
                    message1={null}
                    setFlag={setFlag}
                  ></DisplayLayout>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
