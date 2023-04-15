import { useState } from "react";
import GetLocation from "./GetLocation";
import UpcomingBooking from "./UpcomingBooking";
import seat from '../../Static/seats.png'
import GetSeat from "./GetSeat";
const Home = () => {
    const[locationId,setLocationId]=useState("");
    const[date,setDate]=useState(null);
  return (
    <>
      <div className="container">
        <div className="container-content">
          <div className="row">
            <div className="row-card">
              <div className="row-card-title">
                <h2>Upcoming Booking</h2>
              </div>
              <div className="row-card-body">
                <div className="table-scroll">
                  <table className="table">
                    <UpcomingBooking/>
                  </table>
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
                    <form className="modal-form">
                      <div className="form-item">
                        <input type="date" name="date" id="date" value={date} onChange={(e)=>{setDate(e.target.value);
                        }} />
                      </div>
                      <div className="form-item">
                        <GetLocation locationId={locationId} setLocationId={setLocationId}/>
                      </div>
                      <button className="button-group" type="submit">
                        Get Seats
                      </button>
                    </form>
                  </div>
                </div>
                <div className="card-body-col">
                  <div className="seat-display">
                    <GetSeat/>
                    {/* <img src={seat} alt="" className="seat-display-img"/>  */}
                  </div>
                  <div className="seat-book-item">
                    <p>
                      
                      <span> &diams;</span> You have selected B1 for 23-03-2023
                    </p>
                    <button className="button-group">Book Seat</button>
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
