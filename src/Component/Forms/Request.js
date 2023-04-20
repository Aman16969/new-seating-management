import React, { useState } from 'react';

function Request() {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting message: ${message}`);
  };

  return (
    <form onSubmit={handleSubmit}>
    <center><h1>Request Access</h1></center>  
     <center>
     <textarea
        className="form-control"
        placeholder="Enter your message here"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      /></center> 
     <center><button type="submit" className="btn btn-primary">
        Request
      </button></center> 
    </form>
  );
}

export default Request;