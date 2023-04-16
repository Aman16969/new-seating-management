import { useState, useEffect } from "react";
import DeleteLocation from "./DeleteLocation";
import EditLocation from "./EditLocation";
const LocationList = () => {
  const [locations, setLocations] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");
  const[isOpenCon,setIsOpenCon]=useState(false)
  const[isOpenEdit,setIsOpenEdit]=useState(false)
  const[location,setlocationId]=useState(null);
  const[message,setMessage]=useState("");
  const handlePopup=(e)=>{
    setlocationId(e)
    setIsOpenCon(true)
  }
  const handlePopEdit=(e)=>{
    setlocationId(e)
    setIsOpenEdit(true)
  }
  useEffect((e) => {
    
    setIsPending(true);
      fetch("http://localhost:8081/api/location/", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setLocations(data);
          setIsPending(false);
        })
        .catch((error) => {
          setIsPending(false);
          setError(error.message);
        });
  }, [locations]);
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
                {locations && locations.map((location) => (
                  <tr className="table-row" key={location.id}>
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
                        
                        value={location.id} onClick={() => handlePopEdit(location.id)}
                      />
                      <img
                        className="action-icons"
                        id="delete"
                        src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/null/external-delete-multimedia-kiranshastry-gradient-kiranshastry.png"
                        alt="logo"
                        
                        value={location.id} onClick={() => handlePopup(location.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isOpenCon && <DeleteLocation location={location} setMessage={setMessage} setIsOpenCon={setIsOpenCon}  />
        }
        {isOpenEdit && <EditLocation location={location} setIsOpenEdit={setIsOpenEdit}/>}
    </>
  );
};
export default LocationList;
