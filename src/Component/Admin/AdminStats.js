import jsPDF from "jspdf";
import React, {useState} from "react";

function AdminStats () {
  const [fromDate, setFromDate]= useState(null);
  const [toDate, setToDate]= useState(null);
  const [roomType, setRoomType] = useState("all");
  const [location, setLocation] = useState("all");

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };
  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`From Date: ${fromDate}`, 10, 10);
    doc.text(`To Date: ${toDate}`,10,20);
    doc.text(`Room Type: ${roomType}`,10,30);
    doc.text(`Location: ${location}`,10,40);
    doc.save('statistics.pdf');
  };
  return (
    <>
      <div>
        <br />
  
        <label htmlFor="fromDate">From Date:</label>
        <input type="date" id="fromDate" value={fromDate} onChange={handleFromDateChange} /><br/>


        <label htmlFor="toDate">To Date:</label>
        <input type="date" id="toDate" value={toDate} onChange={handleToDateChange} /><br/>

        <label htmlFor="roomType">Select Type:</label>
        <select id="roomType" value={roomType} onChange={handleRoomTypeChange}>
        <option value="" hidden >---------------------</option>
          <option value="board-room">Board Room</option>
          <option value="conference-room">Conference Room</option>
          <option value="regular-room">Regular Room</option>
        </select><br/>

        <label htmlFor="location">Location:</label>
        <select id="location" value={location} onChange={handleLocationChange}>
        <option value="" hidden >------------------------</option>
          <option value="place">All</option>
        
        </select><br/>

        <button className="ad" onClick={handleDownloadPdf}>Download PDF</button>
      </div>
    </>
  );
};

export default AdminStats;