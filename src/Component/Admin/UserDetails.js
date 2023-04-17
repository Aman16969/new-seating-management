import React, { useState, useEffect } from "react";
import profilePic from "../../Static/man.png";

function UserDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const header = "Bearer " + localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/user/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: header,
          },
        });
        if (!response.ok) {
          throw new Error("Response not received");
        }
        const data = await response.json();
        setUserDetails(data);
        setIsPending(false);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };
    fetchUserDetails();
  }, []);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="container-content">
          <header>
            <h2>
              {/* <img className="profile-img" src={profilePic} alt="Profile" />{" "} */}
              Employee Details
            </h2>
          </header>

          <div className="row-card">
            <div className="row-card-body" style={{ height: "490px" }}>
              <div className="row-card-title">
                <table>
                  <tr className="user-row">
                    <th>Accolite Id</th>
                    <th>Email</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Role</th>
                  </tr>
                </table>
              </div>
              <div className="table-scroll">
                <table className="table">
                  <tbody>
                    {userDetails.map((user) => (
                      <tr key={user.id} className="user-row">
                        <td>{user.accoliteId}</td>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
