import { useState, useEffect } from "react";
import AdminSeat from "./AdminSeat";

const LocationLayout = ({ location }) => {
  console.log(location);
  const rows = [];
  for (let i = 1; i <= location.rs; i++) {
    const cols = [];
    for (let j = 1; j <= location.cs; j++) {
      cols.push(<td><h3>{<AdminSeat location={location} row={i} col={j}/>}</h3></td>);
    }
    rows.push(<tr>{cols}</tr>);
  }
  return(<table>{rows}</table>);
};

export default LocationLayout;
