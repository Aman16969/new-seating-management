import { useEffect, useState } from "react";

const PendingRequest = (props) => {
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const[roomBookingid,setRoomBookingId]=useState(null)
  useEffect(() => {
    const header = "Bearer " + sessionStorage.getItem("accessToken");
    const email = sessionStorage.getItem("email");
    fetch(`http://localhost:8081/api/requestBooking/byUser/${email}`, {
      headers: {
        Authorization: header,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Response not received");
        }
        return res.json();
      })
      .then((data) => {
        setAcceptedRequest(data);
        console.log(data);
        setIsPending(false);
      })
      .catch((err) => {
        setIsPending(false);
      });
  }, [props.flag]);
  const handlePopup=(id)=>{
    setIsOpenCon(true)
    setRoomBookingId(id)
  }
  const handleDelete=(id)=>{
    const header = "Bearer " + sessionStorage.getItem("accessToken");
    fetch(
      `http://localhost:8081/api/requestBooking/request/${id}/value/false`,
      {
        method: "PUT",
        headers: {
          Authorization: header,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("cannot be deleted");
        }
        return res;
      })
      .then((e) => {
        props.setFlag((prevState) => !prevState);
        setIsOpenCon(false);
        console.log("booking canceled successfully");
      })
  }
  return (
    <>
      {!isPending && acceptedRequest.length > 0 && (
       <table className="header-booking">
       <tbody className="header-booking">
          {acceptedRequest.map((request) => (
            <tr key={request.id} className="header-booking">
              <td>{request.description}</td>
              <td>
                <button
                  className="button-group"
                  value={request.id}
                  onClick={() => handlePopup(request.id)}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      )}
      {isOpenCon && (
        <div className="popupContainer" onClick={() => setIsOpenCon(false)}>
          <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
            <div className="popupHeader">
              <h2>Are you sure to cancel this booking?</h2>
            </div>
            <div className="buttonsContainer">
              <button
                type="submit"
                className="submit-btn"
                onClick={() => {
                  handleDelete(roomBookingid);
                  setIsOpenCon(false);
                }}
              >
                Yes
              </button>
              <button
                type="reset"
                className="cancel-btn"
                onClick={() => setIsOpenCon(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingRequest;
