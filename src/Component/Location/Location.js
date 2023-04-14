import LocationForm from "./LocationForm";
import LocationList from "./LocationList";
import { useState, useEffect } from "react";

const Location = () =>{
    const [locations, setLocations] = useState(null);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const token=localStorage.getItem("accessToken");
    useEffect(()=>{
        setPending(true);
        setTimeout(()=>{
            fetch('http://localhost:8081/api/location/', {
                method: "GET",
                headers: {"content-type": "application/json", Authorization: "Bearer "+ token}
            }).then((response)=>{
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                return response.json();
            }).then((data)=>{
                setLocations(data);            
                setPending(false);
            }).catch((error)=>{
                setPending(false);
                setError(error.message)
            })
        },1000)
    },[]);

    return(
        <>
            <div>
                {isPending && <div>Loading...</div>}
                {error && <div>error</div>}
                {locations && <LocationList locations={locations}/>}
            </div>
            <div>
                <LocationForm/>
            </div>
        </>
    );
}

export default Location;