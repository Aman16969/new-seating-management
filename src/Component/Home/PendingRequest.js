import { useEffect, useState } from "react";

const PendingRequest = (props) => {
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  const [isPending, setIsPending] = useState(true);
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
  }, []);
  return (
    <>
      {!isPending && acceptedRequest.length > 0 && (
        <tbody>
          {acceptedRequest.map((request) => (
            <tr key={request.id}>
              <td>{request.description}</td>
              <td>
                <button
                  className="button-group"
                  value={request.id}
                  // onClick={() => handlePopup(request.id)}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </>
  );
};

export default PendingRequest;
