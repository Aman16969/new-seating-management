import { useRef } from "react";
import "./Attendance.css";
import { AttendanceExcel } from "./AttendanceExcel";

const Attendance = () => {
  const fileInput = useRef(null);
  const filePathset = (e) => {
    console.log(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AttendanceExcel(fileInput.current.files[0]);
  };

  return (
    <>
      <div className="container">
        <div className="container-content">
          <div className="row-card" style={{ height: "86.5vh" }}>
            Upload the Excel Attendance Sheet
            <div>
              <form className="attendance-form">
                <label for="date"> Select Date </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  min={new Date().toISOString().split("T")[0]} // Set minimum date to today
                />

                <label htmlFor="attendance"> Upload the Excel Sheet</label>
                <input
                  type="file"
                  id="file"
                  ref={fileInput}
                  name="file"
                  onChange={filePathset}
                />
                <button onClick={handleSubmit}>Fetch attendance</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
