import { useState, useEffect } from "react";
import AdminSeat from "./AdminSeat";
import "./location.css"

const LocationLayout = ({ location }) => {
  console.log(location);
  const [rows, setRows] = useState(location.rs);
  const [cols, setCols] = useState(location.cs);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");

  const updateRowsAndCols = () =>{
    fetch(`http://localhost:8081/api/location/updateRowAndColumn?location=${location.id}&row=${rows}&column=${cols}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        window.location.reload();
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  }
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
    <div>
    Rows: <input type="number" value={rows} onChange={(e)=>{setRows(e.target.value)}}/>
    Columns: <input type="number" value={cols} onChange={(e)=>{setCols(e.target.value)}}/>
    <button onClick={()=>{updateRowsAndCols()}}>Update Layout</button>
    <div id="locationLayout">
      {seatSet}
    </div>
    </div>
  )

};

export default LocationLayout;
