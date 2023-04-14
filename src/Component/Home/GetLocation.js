import { useState, useEffect } from "react";
const GetLocation = (props) => {
    const[location,setLocation]=useState(null)
    const[error,setError]=useState("")
    const[isPending,setIsPending]=useState(true)
    const accessToken = localStorage.getItem("access_token");
    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:8081/api/location/`,{
                headers: {
                    "Content-type": "application/json",
                    Authorization: accessToken},
            }).then((response)=>{
                if(!response.ok){
                    throw Error(response.statusText)
                }
                return response.json();
            }).then((data)=>{
                setLocation(data)
                setIsPending(false)
            }).catch((error)=>{
                setError(error)
            })
    },500)
},[])
  return (
    <>
    {error && <span>{error}</span>}
      <select className="drop-select" name="select" id="select" value={props.locationId} onChange={(e)=>props.setLocationId(location.id)}>
        <option value="none" selected disabled hidden>
          Select a Location
        </option>
        {isPending && <span>Loading Location</span>}
        {location && location.map((loc)=>
                <option key={loc.id} value={loc.id} >{loc.name}</option>
        )}
       
      </select>
    </>
  );
};

export default GetLocation;
