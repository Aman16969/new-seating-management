import { useState } from "react";
import * as XLSX from "xlsx";
import "./Attendance.css";
import { AttendanceExcel } from "./AttendanceExcel";
import { use } from "@js-joda/core";

const Attendance = () => {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        header: ["Emp_Id", "Name", "Date", "In_Time", "Out_Time"],
        range: 1, // ignore first row
      });

      // const formattedJson = json.map((item) => {
      //   return {
      //     ...item,
      //     Date: item.Date.split("/").reverse().join("-"),
      //   };
      // });

      setJsonData(json);
    };
    reader.readAsBinaryString(file);
  };

  const submitAttendance = () => {
    fetch(`http://localhost:8081/api/booking/markAttendance`, {
      method: "POST",
      headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(jsonData,  null, 2),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("failed to mark attendance");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  return (
    <div className="container">
      <div className="container-content">
        <div className="row-card" style={{ height: "86.5vh" }}>
          <h2>Upload the Excel Attendance Sheet</h2>
          <div>
            <form className="attendance-form">
              <label for="date">Select Date</label>{" "}
              <input
                type="date"
                name="date"
                id="date"
                min={new Date().toISOString().split("T")[0]}
              />
              <label htmlFor="attendance">Upload the Excel Sheet</label>
              <input type="file" onChange={handleFile} />
              <button onClick={()=>submitAttendance()}>Mark Attendance</button>
              {data && <>{data}</>}
              {jsonData && <>{JSON.stringify(jsonData,  null, 2)}</>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
