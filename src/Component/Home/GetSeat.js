import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetSeat = ({ date, locationId,fromTime,toTime,seatId, ...props }) => {
  const navigate=useNavigate();
  useEffect(()=>{
    if(sessionStorage.getItem("userLocation")===null){
      navigate("/profile")
    }
  },[])
  const [allSeats, setAllSeats] = useState([]);
  const [availableSeat, setAvailableSeat] = useState({});
  const [isPendings, setIsPendings] = useState(true);
  const [isPendingsa, setIsPendingsa] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    if (date && fromTime && toTime && locationId) {
      const header = "Bearer " + sessionStorage.getItem("accessToken");
      fetch(`http://localhost:8081/api/seat/location/${locationId}`, {
        headers: {
          Authorization: header,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("filed to load the seats");
          }
          return res.json();
        })
        .then((data) => {
          setAllSeats(data);
          console.log(allSeats)
          props.setCountAll(data.length);
          setIsPendings(false);
          props.setFlag(!props.flag);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [fromTime,toTime,locationId,date]);
  

  useEffect(() => {
    if (locationId && date && fromTime && toTime ) {
      const header = "Bearer " + sessionStorage.getItem("accessToken");
      fetch(
        `http://localhost:8081/api/booking/available/locationDateTime?location=${locationId}&date=${date}&fromTime=${fromTime}&toTime=${toTime}`,
        {
          headers: {
            Authorization: header,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("filed to load the available seats");
          }
          return res.json();
        })
        .then((data) => {
          setAvailableSeat(data);
          console.log(availableSeat)
          props.setCountAvailable(Object.keys(data).length);
          setIsPendingsa(false);
          props.setFlag(!props.flag);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [date, locationId,fromTime,toTime]);
  const handleChange = (e) => {
    props.setSeatName(e.name);
    props.setSeatId(e.id);
  };
  return (
    <>
      {/* {error&&<span>{error}</span>} */}

      {allSeats &&
        availableSeat &&
        allSeats.map((seat) => {
          if (availableSeat.hasOwnProperty(seat.id)) {
            return (
              <div className="seat">
                <label
                  key={seat.id}
                  style={{
                    backgroundColor: seatId === seat.id ? "#7efaae" : "#5de1ff",
                  }}
                >
                  <input
                    type="radio"
                    name="seat"
                    value={seat.id}
                    style={{ display: "contents" }}
                    onChange={(e) => props.setSeatId(e.target.value)}
                    onClick={() => handleChange(seat)}
                  />
                  <span>{seat.name}</span>
                </label>
                {/* {(index + 1) % 20 === 0 && <br />} */}
              </div>
            );
          } else {
            return (
              <div className="seat">
                <label key={seat.id} style={{ backgroundColor: "#fb7765" }}>
                  <input
                    type="radio"
                    name="seat"
                    value={seat.id}
                    style={{ display: "contents" }}
                    checked={seat.id === props.selectedSeat}
                    disabled
                  />
                  <span>{seat.name}</span>
                </label>
                {/* {(index + 1) % 20 === 0 && <br />} */}
              </div>
            );
          }
        })}
    </>
  );
};

export default GetSeat;
