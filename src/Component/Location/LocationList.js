import { useState, useEffect } from "react";

const LocationList = ({ locations }) => {
  return (
    <div className="row-card">
      <div className="row-card-title">
        <h2>All locations</h2>
        <table>
          <tr class="table-row">
            <th>Location</th>
            <th>Seating Capacity</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </table>
      </div>
      <div className="table-scroll">
        {locations.map((location) => (
          <table>
            <tr class="table-row">
              <td>{location.name}</td>
              <td>{location.seatingCapacity}</td>
              <td>
                <img width={"100px"} src={location.image} />
              </td>
              <td class="Action">
                <button class="button-group">edit</button>
                <button class="button-group">x</button>
              </td>
            </tr>
          </table>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
