import { useEffect, useState } from "react";

const GetSeat = () => {
    const locationId=1;
    const date="2023-03-05";
    const [allSeats,setAllSeats]=useState([]);
    const[bookedseat,setBookedSeat]=useState({})
    const [isPendings, setIsPendings] = useState(true);
    const [isPendingsa, setIsPendingsa] = useState(true);
    const [error, setError] = useState("");
    useEffect(()=>{
        const header = "Bearer " + localStorage.getItem('accessToken');
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
                setIsPendings(false)
          }).catch((error)=>{
            setError(error.message)
          })
    },[locationId])
    useEffect(()=>{
      const header = "Bearer " + localStorage.getItem('accessToken');
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
            setBookedSeat(data)
                setIsPendingsa(false)
          }).catch((error)=>{
            setError(error.message)
          })
    },[locationId,date])
    console.log(bookedseat)
    return ( <>
    {isPendings && <span>Loading...</span>}
    {error&&<span>{error}</span>}
    {allSeats&& allSeats.map((seat)=>{
      if(bookedseat.hasOwnProperty(seat.id)){
        return(
        <div className="seat">
        <input type="checkbox" key={seat.id} value={seat.id} />
        <label for={seat.id} style={{background: '#1dc4e9'}}>{seat.name}</label>
    </div>)
      }
      else{
        return(
        <div className="seat">
        <input type="checkbox" key={seat.id} value={seat.id} disabled />
        <label for={seat.id} style={{background: 'RED'}}>{seat.name}</label>
    </div>)
      }
    }
    


    
    )}
    </> );
}
 
export default GetSeat;