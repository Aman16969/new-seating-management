import React, { useEffect, useState } from "react";
function RequestAccess({ onClose }) {
  const [description, setDescription] = useState("");
  const email = sessionStorage.getItem("email");
  const token = "Bearer " + sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (description === "Your request has been sent succesfully!") {
      window.location.reload();
    }
  }, [description]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting description: ${description}`);
    const requestData = {
      email: sessionStorage.getItem("email"),
      description: description,
    };
    console.log(JSON.stringify(requestData));
    fetch("http://localhost:8081/api/requestBooking/", {
      method: "POST",
      headers: {"Content-Type":"application/json", "Authorization": token },
      body: JSON.stringify(requestData),
    
    })  
      .then((response) => {
        if (response.ok) {
          setDescription("Your request has been sent successfully!");
        } else {
          throw new Error("failed to send request");
        }
      })
      .catch((error) => {
        setDescription(error.Description);
      });
  };
 

  return (
    <div className="request-card">
      <h1>Request Access</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          placeholder="Please provide your role along with date, time slot and purpose"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <span className="request-card-center">
          <button type="submit">Request</button>
          &nbsp;&nbsp;
          <button onClick={onClose}>Close</button>
        </span>
      </form>
    </div>
  );
}

export default RequestAccess;

