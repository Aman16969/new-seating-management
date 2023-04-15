import { useState, useEffect } from "react";

const LocationList = ({ locations }) => {
  return (
    <>
      <div className="row-card">
      <div className="row-card-body" style={{height:'545px'}}>
        <div className="row-card-title">
          <table>
            <tr className="table-row">
              <th>Location</th>
              <th>Seating Capacity</th>
              <th>Layout</th>
              <th>Action</th>
            </tr>
          </table>
        </div>

        
          <div className="table-scroll" >
            <table className="table">
              <tbody>
                {locations.map((location) => (
                  <tr className="table-row">
                    <td>{location.name}</td>
                    <td>{location.seatingCapacity}</td>
                    <td>
                      <img src={location.image} alt="layout" className="layout-img"/>
                    </td>
                    <td className="action">
                      <img
                        className="action-icons"
                        id="edit"
                        src="https://img.icons8.com/ultraviolet/40/null/edit.png"
                        alt="logo"
                      />
                      <img
                        className="action-icons"
                        id="delete"
                        src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/null/external-delete-multimedia-kiranshastry-gradient-kiranshastry.png"
                        alt="logo"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default LocationList;
