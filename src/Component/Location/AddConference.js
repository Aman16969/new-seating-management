import React, { useState } from "react";
import "./location.css"
function AddConference ({ onSave, onClose }) {
  const [roomName, setRoomName] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ roomName, seatingCapacity });
  };

  const handleCancel = () => {
    onClose();
  }

  return (
    <div className="conference">
     
        <form onSubmit={handleSave}>
          <label>
            Room Name:
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </label>
          <label>
            Seating Capacity:
            <input
              type="number"
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
            />
          </label>
          <span className="addcancel">
         <button type="submit">Add Room</button>
          <button type="button" onClick={handleCancel}>
              Cancel
            </button> 
            
            </span>
         
        </form>
    </div>
  );
};

export default AddConference;