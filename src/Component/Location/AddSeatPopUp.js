import { useState } from "react";

const AddSeatPopUp = ({ onHandleAdd, onHandleCancel }) => {
  const [name, setName] = useState(null);
  const [isOpenCon, setIsOpenCon] = useState(false);
  const handlePopup = () => {
    setIsOpenCon(true);
  };
  return (
    <>
      <div
        className="locationpopupContainer"
        onClick={() => setIsOpenCon(false)}
      >
        <div className="location-popup-boxd" >
          <b>Seat Name</b>
          <input 
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <button className="button-group"
            onClick={() => {
              onHandleAdd(name);
            }}
          >
            Add
          </button>
          <button
          className="button-group"
            onClick={() => {
              onHandleCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AddSeatPopUp;
