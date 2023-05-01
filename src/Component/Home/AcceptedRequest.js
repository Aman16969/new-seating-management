import { useEffect, useState } from "react";

const AcceptedRequest = (props) => {
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const header = "Bearer " + sessionStorage.getItem("accessToken");
    const email = sessionStorage.getItem("email");
    fetch(`http://localhost:8081/api/bookRoom/user/${email}`, {
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
              <td>{request.location.name}</td>
              <td>{request.fromTime}</td>
              <td>{request.toTime}</td>
              <td>{request.room.roomType}</td>
            </tr>
          ))}
        </tbody>
      )}
    </>
  );
};

export default AcceptedRequest;
