import LocationForm from "./LocationForm";
import LocationLayout from "./LocationLayout";
import LocationList from "./LocationList";
import { useState, useEffect } from "react";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
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
  const handleLocationChange = (event) => {
    const locationId = parseInt(event.target.value);
    const selectedLocation = locations.find(
      (location) => location.id === locationId
    );
    setSelectedLocation(selectedLocation);
  };

  return (
    <>
      <div className="container-content">
        <div className="row-card">
          <div class="row-card-title">
            <h2>Locations</h2>
          </div>
          <select
            className="drop-select"
            name="select"
            id="select"
            value={selectedLocation?.id || ""}
            onChange={handleLocationChange}
          >
            <option value="">Select a location</option> // add a default option
            with an empty value
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          {selectedLocation && <LocationLayout location={selectedLocation} />}{" "}
        </div>
      </div>
    </>
  );
};

export default Location;
