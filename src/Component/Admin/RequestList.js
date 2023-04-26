import React, { useEffect, useState } from "react";

function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch(`http://localhost:8081/api/requestBooking/`);
      const data = await response.json();
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    const response = await fetch(`http://localhost:8081/api/requestBooking/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (response.ok) {
      // Send notification to the user who made the request
      const request = requests.find((r) => r.id === id);
      const notificationData = {
        email: request.email,
        message: `Your request for "${request.description}" has been ${action}d by the admin.`,
      };
      const notificationResponse = await fetch(
        "http://localhost:8081/api/notifications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationData),
        }
      );

      if (notificationResponse.ok) {
        // Reload the requests
        const newRequests = [...requests];
        const requestIndex = newRequests.findIndex((r) => r.id === id);
        newRequests.splice(requestIndex, 1);
        setRequests(newRequests);
      } else {
        // Handle notification error
      }
    } else {
      // Handle request error
    }
  };

  return (
    <div>
      <h3>Requests</h3>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <div>
              <strong>Email:</strong> {request.email}
            </div>
            <div>
              <strong>Description:</strong> {request.description}
            </div>
            <div>
              <button onClick={() => handleAction(request.id, "approve")}>
                Approve
              </button>
              <button onClick={() => handleAction(request.id, "deny")}>
                Deny
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestList;