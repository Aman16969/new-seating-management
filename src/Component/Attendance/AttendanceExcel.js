import React from "react";
import * as XLSX from "xlsx";

export const AttendanceExcel = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const attendanceData = XLSX.utils.sheet_to_json(worksheet);
    console.log(attendanceData);
  };
  reader.readAsBinaryString(file);
};

export default AttendanceExcel;
