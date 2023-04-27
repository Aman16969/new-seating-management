import React from "react";
import * as XLSX from "xlsx";

export const AttendanceExcel = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const attendanceData = XLSX.utils
      .sheet_to_json(worksheet, {
        header: ["Emp_ID", "Name", "Date", "In_Time", "Out_Time"],
        dateNF: "mm/dd/yyyy",
        timeNF: "hh:mm:ss AM/PM",
      })
      .map((row) => ({
        ...row,
        Date: row.Date ? new Date(row.Date) : null,
        In_Time: row.In_Time ? new Date(row.In_Time) : null,
        Out_Time: row.Out_Time ? new Date(row.Out_Time) : null,
      }));
    console.log(attendanceData);
  };
  reader.readAsBinaryString(file);
};

export default AttendanceExcel;
