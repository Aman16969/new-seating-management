import { useEffect, useState } from "react";

const AcceptedRequest = ({ rFlag, setRFlag, ...props }) => {
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
        setIsPending(false);
      })
      .catch((err) => {
        setIsPending(false);
      });
  }, [rFlag]);
  const yearMonthDay = new Date();
  const currentDate = yearMonthDay.toISOString().substr(0, 10);
  return (
    <>
      {!isPending && acceptedRequest.length > 0 && (
        <table className="header-booking">
          <tbody className="header-booking">
            {acceptedRequest.map((request) => {
              if (request.date >= currentDate) {
                return (
                  <tr key={request.id} className="header-booking">
                    <td>{request.date}</td>
                    <td>{request.room.roomType}</td>
                    <td>{request.room.name}</td>
                    <td>
                      {request.fromTime.substring(0, 5)} -
                      {request.toTime.substring(0, 5)}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AcceptedRequest;
