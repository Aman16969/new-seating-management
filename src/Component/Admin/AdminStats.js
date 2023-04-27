import jsPDF from "jspdf";
import React, {useState} from "react";

function AdminStats () {
  const [fromDate, setFromDate]= useState(null);
  const [toDate, setToDate]= useState(null);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };
  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`From Date: ${fromDate}`, 10, 10);
    doc.text(`To Date: ${toDate}`,10,20);
    doc.save('statistics.pdf');
  };
  return (
    <>
      <div>
        <label htmlFor="fromDate">From Date:</label>
        <input type="date" id="fromDate" value={fromDate} onChange={handleFromDateChange} /><br></br>

     <label htmlFor="toDate">To Date:</label>
        <input type="date" id="toDate" value={toDate} onChange={handleToDateChange} /><br></br>

       <center> <button className="ad" onClick={handleDownloadPdf}>Download PDF</button></center>
      </div>
    </>
  );
};

export default AdminStats;
