import { useEffect, useState } from "react";
import viewIcon from "../../Static/eye-solid.svg";
const Layout = (props) => {
  const [locationData, setLocationData] = useState([]);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false);
  const [layout, setLayout] = useState(null);
  useEffect(() => {
    console.log(props.locationId);
    const header = "Bearer " + sessionStorage.getItem("accessToken");
    fetch(`http://localhost:8081/api/location/${props.locationId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: header,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("cannot fetch the location detail");
        }
        return res.json();
      })
      .then((data) => {
        setLocationData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [props.locationId]);
  const handlePopup = (e) => {
    setLayout(e);
    setPopup(true);
  };
  return (
    <>
    
      <div>
        
        {locationData && (
          <img
            className="view-layout-icon"
            src={viewIcon}
            alt="view"
            key={locationData.id}
            value={locationData.image}
            onClick={(e) => handlePopup(e.target.value)}
          />
        )}
      </div>
      {popup&& <div
        className="popupContainer"
        onClick={() => {
          setPopup(false);
        }}
      >
        <div className="popup" onClick={(e) => e.stopPropagation()}>

          <div className="container-layout-location">
            <img src={locationData.image} alt="layout" className="location-layout-img" />
          </div>
        </div>
      </div>}
      
    </>
  );
};

export default Layout;
