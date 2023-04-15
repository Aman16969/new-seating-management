import { useState, useEffect } from "react";

const LocationList = ({locations}) => {
  const token = "Bearer "+localStorage.getItem("accessToken");
  const handleDelete = (id) => {
    fetch("http://localhost:8081/api/location/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then(() => {
      window.location.reload();
    });
  };
  
  const handleEdit = (id) => {
    // fetch("http://localhost:8081/api/location/" + id, {
    //   method: "DELETE",
    // }).then(() => {
    //   window.location.reload();
    // });
  };

  return (
    <div className="row-card">
      <h1>All Locations</h1>
      <table>
        <div className="row-card-title">
            <tr class="table-row">
                <th>Location</th>
                <th>Seating Capacity</th>
                <th>Action</th>
            </tr>
            {locations.map((location)=>(
                <tr class="table-row">
                    <td>{location.name}</td>
                    <td>{location.seatingCapacity}</td>
                    <td class="Action">
                    <button class="button-group" onClick={()=>handleEdit}>edit</button>
                    <button class="button-group" onClick={()=>handleDelete(location.id)}>x</button>
                    </td>
                </tr>)
            )}
        </div>
      </table>
    </div>
  );
};

export default LocationList;
