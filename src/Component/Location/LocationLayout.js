import { useState, useEffect } from "react";
import AdminSeat from "./AdminSeat";
import "./location.css"

const LocationLayout = ({ location }) => {
  console.log(location);
  // const rows = [];
  // for (let i = 1; i <= location.rs; i++) {
  //   const cols = [];
  //   for (let j = 1; j <= location.cs; j++) {
  //     cols.push(<td><h3>{<AdminSeat location={location} row={i} col={j}/>}</h3></td>);
  //   }
  //   rows.push(<tr>{cols}</tr>);
  // }
  // return(<><h1>{location.name}</h1>
  // <table>{rows}</table></>);

  // useEffect(()=>{
  //   // document.getElementById("locationLayout").style.gridTemplateColumns=`repeat(${location.rs},fr)`
  // },[onload])


  const seatSet=[];
  for(let i=1;i<=location.rs;i++)
    for(let j=1;j<=location.cs;j++)
      seatSet.push(<div className="seatCell">{<AdminSeat location={location} row={i} col={j}/>}</div>)

  return (
    <div id="locationLayout">
      {seatSet}
    </div>
  )

};

export default LocationLayout;
