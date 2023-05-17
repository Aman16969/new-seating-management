import React from "react";
import "./Profile.css";
import { Chart } from "react-google-charts";

export const data = [
  ["Bookings", "No. of days"],
  ["Upcoming Bookings", 5],
  ["Booked and attended", 2],
  ["Booked and not attended", 2],
];

export const options = {
  title: "Bookings",
  pieHole: 0.4,
  is3D: false,
};

export function Stats() {
  return (
    <div id="chartContainer">
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
