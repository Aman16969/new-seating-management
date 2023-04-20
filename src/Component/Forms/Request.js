
import React, { useState } from 'react';
function Request() {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting message: ${message}`);
  };

  return (
    <div className="request-card">
      <h1>Request Access</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          placeholder="Enter your message here"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <div className="request-card-center">
          <button type="submit">Request</button>
        </div>
      </form>
    </div>
  );
}

export default Request;