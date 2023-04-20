import React, { useState } from 'react';

function BookingForm() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [boardRoom, setBoardRoom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Booking submitted: date=${date}, startTime=${startTime}, endTime=${endTime}, location=${location}, boardRoom=${boardRoom}`);
    // You can implement your logic for submitting the booking to the server or updating the database here
  };

  return (
    <form onSubmit={handleSubmit} className='form-group'>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Raleway:wght@600&display=swap');
</style>
        <center><h2>BOARD ROOM BOOKING</h2></center>
      <div >
        
        <center><label htmlFor="date">Date</label></center>
       <center><input
          type="date"
          id="date"
          className="form-control"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        /></center> 
      </div>
      <p></p>
      <div>
        <center><label htmlFor="start-time">Start Time</label></center>
        <center><input
          type="time"
          id="start-time"
          className="form-control"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
          required
        /></center>
      </div>
      <p></p>
     <div >
     <center><label htmlFor="end-time">End Time</label></center>
       <center><input
          type="time"
          id="end-time"
          className="form-control"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
          required
        /></center> 
      </div>
      <p></p>
      <div >
       <center> <label htmlFor="location">Location</label></center>
       <center><select
          id="location"
          className="form-control"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        >
          <option value="">Select location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select></center> 
      </div>
      <p></p>
      <div >
      <center> <label htmlFor="board-room">Board Room</label></center> 
        <center><select
          id="board-room"
          className="form-control"
          value={boardRoom}
          onChange={(event) => setBoardRoom(event.target.value)}
          required
        >
          <option value="">Select board room</option>
          <option value="Board Room 1">Board Room A</option>
          <option value="Board Room 2">Board Room B</option>
          <option value="Board Room 3">Board Room C</option>
        </select></center>
      </div>
      <p></p>
    <center><button type="submit" className="btn btn-primary">
        Book
      </button></center>  
    </form>
  );
}

export default BookingForm;