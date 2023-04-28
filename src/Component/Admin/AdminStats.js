import React, { useState } from "react";
import FileSaver from "file-saver";

function AdminStats() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [error, setError] = useState(null);
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
  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleDownloadPdf = () => {
    const header = "Bearer " + sessionStorage.getItem("accessToken");
    // const locationId = sessionStorage.getItem("userLocationId");
    fetch(
      `http://localhost:8081/api/pdf/bookings/dateWise/${fromDate}/${toDate}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: header,
        },
      }
    )
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        // Use FileSaver.js to save the blob as a file
        FileSaver.saveAs(
          blob,
          `Bookings between ${fromDate} and ${toDate}.pdf`
        );
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };
  return (
    <>
      <div>
        <br />

        <label htmlFor="fromDate">From Date:</label>

        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={handleFromDateChange}
        />
        <br />

        <label htmlFor="toDate">To Date:</label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={handleToDateChange}
        />
        <br />

        <label htmlFor="roomType">Select Type:</label>
        <select id="roomType" value={roomType} onChange={handleRoomTypeChange}>
          <option value="regular-room">Seat</option>
          <option value="board-room">Board Room</option>
          <option value="conference-room">Conference Room</option>
        </select>
        <br />

        <label htmlFor="location">Location:</label>
        <select id="location" value={location} onChange={handleLocationChange}>
          <option value="place">All</option>
        </select>
        <br />

        <button className="ad" onClick={handleDownloadPdf}>
          Download PDF
        </button>
        <button className="ad" onClick={handleDownloadPdf}>
          Download PDF
        </button>
      </div>
    </>
  );
}

export default AdminStats;
