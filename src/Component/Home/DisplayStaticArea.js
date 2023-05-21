import { useState, useEffect } from "react";
const DisplayStaticArea = ({location,row,col}) => {
    const [area, setArea] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [name, setName] = useState(null);

    useEffect(
        () => {
          fetch(
            `http://localhost:8081/api/locationStaticArea/position?location=${location.id}&row=${row}&column=${col}`,
            {
              method: "GET",
              headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .then((data) => {
                console.log(data)
              setArea(data);
              setName(data.seatName);
              
              
            })
            .catch((error) => {
              setError(error.message);
            });
        },
        []
      );
    return ( <>
    {area &&
          area.isAvailable === 1 &&
          (
            <div
              className="display-area"
              style={{
                
              }}
            >
              {area.areaName}
            </div>
          )}
          {area &&
          area.isAvailable === 0 &&
          (
            <div
              className="display-static-area"
              style={{
                color: "black",
                
                
              }}
            >
              {area.areaName}
            </div>
          )}
    </> );
}
 
export default DisplayStaticArea;