import { useState, useEffect } from "react";

const LocationList = ({locations}) => {
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
                    <button class="button-group">edit</button>
                    <button class="button-group">x</button>
                    </td>
                </tr>)
            )}
        </div>
      </table>
    </div>
  );
};

export default LocationList;
