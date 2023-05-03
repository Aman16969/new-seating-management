import { useEffect, useState } from "react";
import OpenBookingForm from "./RoomBookingForm";
const Request = () => {
  const [requests, setRequest] = useState([]);
  const [requestById, setRequestById] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [acceptedRequest, setAcceptedRequest] = useState(null);
  const [flag, setFlag] = useState(false);
  const [openBookingForm, setOpenBookingForm] = useState(false);
  const token = "Bearer " + sessionStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://localhost:8081/api/requestBooking/", {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("cannot fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setRequest(data);
      });
  }, [flag]);

  const handlePopup = (e) => {
    setRequestId(e);
    
    fetch(`http://localhost:8081/api/requestBooking/${requestId}`, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("cannot fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setRequestById(data);
        setIsOpenCon(true);
        setIsPending(false);
      });
  };

  const handleReject = (id) => {
    fetch(`http://localhost:8081/api/requestBooking/request/${id}/value/false`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ accepted: false }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("cannot fetch the data");
        }
        return res;
      })
      .then(() => {
        setFlag(!flag);
        setIsOpenCon(false);
      });
  };

  const handleAccept = (id) => {
    fetch(`http://localhost:8081/api/requestBooking/request/${id}/book/true`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        Authorization: token,
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("cannot fetch the data");
        }
        return res.json();
      })
     
      .then((data) => {
        setFlag(!flag);
        setAcceptedRequest(data);
        setOpenBookingForm(true);
        setIsOpenCon(false);
        console.log();
        
      });
  };

  return (
    <>
      <tbody>
        {/* {isPending && <div>Loading....</div>} */}
        {requests &&
          requests.map((req) => {
            return (
              <tr className="user-row">
                <td style={{ fontSize: "15px", textAlign: "left" }}>
                  {req.email.substring(0, 35)}
                </td>
                <td>
                  <button
                    className="button-group"
                    value={req.id}
                    onClick={() => handlePopup(req.id)}
                  >
                    view
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
      {openBookingForm && <OpenBookingForm setOpenBookingForm={setOpenBookingForm} userEmail={requestById.email}  acceptedRequest={acceptedRequest}/>}
      {isOpenCon && (
        <div className="popupContainer" onClick={() => setIsOpenCon(false)}>
          <div className="popup-boxd" onClick={(e) => e.stopPropagation()}>
            <div className="popupHeader">
              <h2>Request</h2>
            </div>
            {/* {isPending && <span>Loading...</span>} */}
            {!isPending && (
              <div className="request-info">
                {requestById && (
                  <div className="request-details">
                    <span className="email" >{requestById.email}</span>
                    <hr />
                    <span className="description">Description:
                    {requestById.description}</span>
                    <span className="date">Date: {requestById.date}</span>
                    <span className="fromtime">From Time:{requestById.fromTime}</span>
                    <span className="totime">To Time: {requestById.toTime}</span>
                    <span className="available">Room Type: {requestById.roomType}</span>
                  </div>
                )}
              </div>
            )}

            <div className="buttonsContainer">
              <button type="submit" className="submit-btn"
              onClick={() => handleAccept(requestById.id)}>
                Accept
              </button>
              <button
                type="reset"
                className="cancel-btn"
                onClick={() => handleReject(requestById.id)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Request;
