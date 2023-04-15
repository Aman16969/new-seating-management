import React, { useState, useEffect } from "react";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [Error, setError] = useState(null);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const userId = "1";
  useEffect(() => {
    fetch(`http://localhost:8081/api/user/1`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxLGRlbmN5LnBhdGVsQGFjY29saXRlZGlnaXRhbC5jb20iLCJpc3MiOiJNYXRyaXgiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY4MTUzNDI5NCwiZXhwIjoxNjgxNjIwNjk0fQ.g2raJ6_680ejdDZ-FUPEFc2_NcQzfIfUMV8mGncbJnIn1sPqZ8zN3k_hj_gAG0DRmydvAGRPcdlWf1pf4iUubw",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Response not received");
        }
        return res.json();
      })
      .then((data) => {
        setUserDetail(data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  console.log(userDetail);

  return (
    <>
      <div className="container">
        <div className="container-content">
          {!isPending && (
            <div className="profile-form">
              <h2>PROFILE</h2>
              <br />
              <form className="profile-container">
                <div className="profile-item">
                  <label for="acccolite_id">Accolite ID:</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter Accolite Id"
                    name="accolite_id"
                    id="accolite_id"
                    required
                    readOnly={true}
                    value={userDetail.accoliteId}
                  />
                </div>
                <br />
                <div className="profile-item">
                  <label for="email">Email:</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    id="email"
                    required
                    readOnly={true}
                    value={userDetail.email}
                  />
                </div>
                <br />
                <div className="profile-item">
                  <label for="fname">First Name:</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="fname"
                    id="fname"
                    required
                    readOnly={true}
                    value={userDetail.firstName}
                  />
                </div>
                <br />
                <div className="profile-item">
                  <label for="lname">Last Name:</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lname"
                    id="lname"
                    required
                    readOnly={true}
                    value={userDetail.lastName}
                  />
                </div>
                <br />
                <button
                  className="button-group"
                  style={{ fontSize: "18px" }}
                  onClick={handleEditProfile}
                >
                  Edit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
