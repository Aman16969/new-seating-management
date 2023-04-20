import { useEffect, useState } from "react";
import accolite from '../../Static/Accolite_Logo_Grey.png'
const GetSeat = ({date,locationId,seatId,...props}) => {
    
    
    const [allSeats,setAllSeats]=useState([]);
    const[availableSeat,setAvailableSeat]=useState({})
    const [isPendings, setIsPendings] = useState(true);
    const [isPendingsa, setIsPendingsa] = useState(true);
    const [error, setError] = useState("");
   

    useEffect(()=>{
      if(date && locationId){
        const header = "Bearer " + sessionStorage.getItem('accessToken');
        fetch(`http://localhost:8081/api/seat/location/${locationId}`, {
            headers: {
              Authorization: header,
            },
          }).then((res)=>{
            if(!res.ok){
                throw Error("filed to load the seats")
            }
            return res.json();
          })
          .then((data)=>{
                setAllSeats(data)
                props.setCountAll(data.length)
                setIsPendings(false)
                props.setFlagBooking(props.flagBooking)
                
          }).catch((error)=>{
            setError(error.message)
          })
      }
     
   
    },[locationId,date])

    useEffect(()=>{
      if(locationId && date){
        const header = "Bearer " + sessionStorage.getItem('accessToken');
        fetch(`http://localhost:8081/api/booking/availabe/locationAndDate?location=${locationId}&date=${date}`, {
            headers: {
              Authorization: header,
            },
          }).then((res)=>{
            if(!res.ok){
                throw Error("filed to load the available seats")
            }
            return res.json();
          })
          .then((data)=>{
            setAvailableSeat(data)
                props.setCountAvailable(Object.keys(data).length)
                setIsPendingsa(false)
                props.setFlagBooking(props.flagBooking)
                
          }).catch((error)=>{
            setError(error.message)
          })
      }

    },[date,locationId])
    const handleChange=(e)=>{
      props.setSeatName(e.name)
      props.setSeatId(e.id)
    }
    return ( <>
    {/* {isPendings && 
    <div >
      <img src={accolite} alt="" className="accolite-logo-img"/>
    </div>
    
      } */}
    {/* {error&&<span>{error}</span>} */}


    {allSeats && availableSeat && allSeats.map((seat)=>{
      if (availableSeat.hasOwnProperty(seat.id)) {
        return(
          <div className="seat">
  <label key={seat.id} style={{backgroundColor: seatId===seat.id ? '#7efaae' : '#5de1ff'}}>
        <input
          type="radio"
          name="seat"
          value={seat.id} 
          style={{display: 'contents'}}
          onChange={(e) => props.setSeatId(e.target.value)} 
          onClick={()=>handleChange(seat)}
        />
        <span>{seat.name}</span>
      </label>   </div>     )
      }
      else{
        return(
          <div className="seat" >
          <label key={seat.id} style={{backgroundColor:'#fb7765'}}>
                <input
                  type="radio"
                  name="seat"
                  value={seat.id} 
                  style={{display: 'contents'}}
                  checked={seat.id === props.selectedSeat} disabled
                />
                <span>{seat.name}</span>
              </label>   </div>     )      }
    })}
    </> );
}
 
export default GetSeat;