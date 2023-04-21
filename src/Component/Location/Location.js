import LocationForm from "./LocationForm";
import LocationLayout from "./LocationLayout";
import LocationList from "./LocationList";
import { useState, useEffect } from "react";

const Location = () => {
  const [locations, setLocations] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");

  useEffect((e) => {
    fetch("http://localhost:8081/api/location/", {
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
        setLocations(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <div className="container-content">
        <h1>Locations</h1>
        {locations &&
          locations.map((location) => <button onClick={()=>setLocation(location)}>{location.name}</button>)}
        {location && <LocationLayout location={location}/>}
      </div>
    </>
  );
};

export default Location;
