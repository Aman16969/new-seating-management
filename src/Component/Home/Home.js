import { useState } from "react";
import GetLocation from "./GetLocation";
import UpcomingBooking from "./UpcomingBooking";
import seat from '../../Static/seats.png'
import GetSeat from "./GetSeat";
const Home = () => {
    const[countall,setCountAll]=useState(0)
    const[countAvailable,setCountAvailable]=useState(0)
    const[locationId,setLocationId]=useState(null);
    const[date,setDate]=useState("");
    const[seatName,setSeatName]=useState("");
    const[seatId,setSeatId]=useState("");
    const[gseat,setgseat]=useState(false);
    const[message,setMessage]=useState("");

    const handleBooking=()=>{
      const header = "Bearer " + localStorage.getItem('accessToken');
      const bookingDetail = {
        location_id: locationId,
        user_id: 2,
        seat_id: seatId,
        date: date,
      };
  
        fetch(`http://localhost:8081/api/booking/`, {
          
          method:"POST",
            headers: {"content-type":"application/json",
              Authorization: header,
            },
            body:JSON.stringify(bookingDetail)
    }).then((res)=>{
        if(!res.ok){
          throw Error("failed to book seat")
        }
        setMessage(
          "You Have Booked A seat: " + seatName + " on " + date + "."
        );
    })
  }
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
                    <span>{message}</span>
                    <form className="modal-form">
                      <div className="form-item">
                        <input type="date" name="date" id="date" value={date} onChange={(e)=>{setDate(e.target.value);
                        }} />
                      </div>
                      <div className="form-item">
                        <GetLocation locationId={locationId} setLocationId={setLocationId}/>
                      </div>
                      
                    </form>
                  </div>
                </div>
                <div className="card-body-col">
                  <div className="seat-display">
                    <GetSeat date={date} locationId={locationId} seatId={seatId} setSeatId={setSeatId} setSeatName={setSeatName} setCountAvailable={setCountAvailable} setCountAll={setCountAll}/>
                    {/* <img src={seat} alt="" className="seat-display-img"/>  */}
                  </div>
                  <div className="seat-book-item">
                    <p>
                      {!date&&!locationId&&<span>Welcome To Accolite Digital. Please Book Your Seat.</span>}
                     {date&&locationId&&seatName && 
                      <span style={{color:'#3f4d67'}}> &diams; You have selected {seatName} for {date}</span>}
                    </p>
                    {date&& locationId &&<p style={{}}>
                      <span style={{color:'red'}}>Available:</span><span style={{color:'#3f4d67'}}>{countAvailable} &#8725;{countall}</span></p>}
                      {date&&locationId&&seatName && <button className="button-group" onClick={handleBooking}>Book Seat</button>}
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
