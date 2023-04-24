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
        <div className="location-popup-boxd">
          <h4>Seat Name</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              onHandleAdd(name);
            }}
          >
            Add
          </button>
          <button
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
