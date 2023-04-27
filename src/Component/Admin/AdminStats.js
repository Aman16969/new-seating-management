import React, { useState } from "react";
import FileSaver from "file-saver";

function AdminStats() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [error, setError] = useState(null);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };
  const handleToDateChange = (event) => {
    setToDate(event.target.value);
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
        FileSaver.saveAs(blob, `Bookings between ${fromDate} and ${toDate}.pdf`);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };
  return (
    <>
      <div>
        <label htmlFor="fromDate">From Date:</label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={handleFromDateChange}
        />
        <br></br>

        <label htmlFor="toDate">To Date:</label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={handleToDateChange}
        />
        <br></br>

        <center>
          {" "}
          <button className="ad" onClick={handleDownloadPdf}>
            Download PDF
          </button>
        </center>
      </div>
    </>
  );
}

export default AdminStats;
