import LocationForm from "./LocationForm";
import LocationList from "./LocationList";
import { useState } from "react";
const Location = () => {
  const[flagLocation,setFlagLocation]=useState(false)
  return (
    <>
      <div className="container">
        <div className="container-content">
          <div className="row-location">
            <div>
              <LocationList setflag={setFlagLocation} flag={flagLocation} />
            </div>
            <div>
              <LocationForm  setflag={setFlagLocation} flag={flagLocation} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
