import { useState, useEffect } from "react";

const LocationForm = () => {
  const [name, setName] = useState(null);
  const [seatingCapacity, setSeatingCapacity] = useState(null);
  const [address, setAddress] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");
  console.log(token);

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = { name, seatingCapacity, address };
    console.log(location);
    setIsPending(true);
    fetch("http://localhost:8081/api/location/", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(location),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setIsPending(false);
      })
      .catch((error) => {
        setIsPending(false);
        setError(error.message);
      });
  };

  return (
    <div className="row-card">
      <div className="row-card-title">
        <h2>Add New Location</h2>
      </div>
      <div class="row-card-body">
        <div className="location-container">
          <form className="location-form" onSubmit={handleSubmit}>
            <label for="Location">
              <h2>Location</h2>
            </label>
            <input
              type="text"
              placeholder="Enter Location Name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <label for="seat">
              <h2>Seat Capacity</h2>
            </label>
            <input
              type="number"
              placeholder="Enter Seating Capacity"
              name="seat"
              value={seatingCapacity}
              onChange={(e) => {
                setSeatingCapacity(e.target.value);
              }}
              required
            />
            <label for="address">
              <h2>Address</h2>
            </label>
            <textarea
              name="address"
              id=""
              cols="30"
              rows="3"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></textarea>
            {!isPending && <button>Add Location</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
