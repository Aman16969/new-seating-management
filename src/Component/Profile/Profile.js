import React, { useState, useEffect} from "react";
import profilePic from "../../Static/man.png";
import Location from "../Admin/Location";
function Profile() {
  console.log("hi")
  const [editMode, setEditMode] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [Error, setError] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const header = "Bearer " + sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");
  const [read, setReadOnly] = useState(true);
  const [message, setMessage] = useState("");
  const[flag,setFlag]=useState(true)

  useEffect(() => {
    console.log("hi")
    fetch(`http://localhost:8081/api/user/${userId}`, {
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
        setUserDetail(data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [flag]);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8081/api/user/${userId}/location/${locationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to update");
        }
        return res.json();
      })
      .then((data) => {
        setMessage("User updated Successfully");
        setReadOnly(true);
        setFlag(!flag)
        sessionStorage.setItem("userLocation",data.location)
      })
      .catch((err) => {
        throw Error(err.message);
      });
  };

  return (
    <>
      <div className="container">
        <div className="container-content">
          {!isPending && (
            <div className="profile-form">
              <img className="profile-img" src={profilePic} alt="Profile" />

              <form className="profile-container" onSubmit={handleUpdate}>
                
                <div className="profile-item">
                  <label for="email">Email</label>
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

                <div className="profile-item">
                  <label for="fname">First Name</label>

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

                <div className="profile-item">
                  <label for="lname">Last Name</label>

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
                <div className="profile-item" style={{width:'80%'}} onClick={()=>setReadOnly(false)}>
                  <label for="acccolite_id">Accolite ID</label>
                  <Location setLocationId={setLocationId}  />
                </div>
                <span style={{ fontSize: "small" }}>{message}</span>
                {!read && <button className="button-group">Edit</button>}
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
