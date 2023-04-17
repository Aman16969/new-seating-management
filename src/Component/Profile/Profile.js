import React, { useState, useEffect,useContext } from "react";
import profilePic from "../../Static/man.png";
import AuthContext from "../../ContextApi/AuthContext";
function Profile() {
  const authContext=useContext(AuthContext);
  const {userrole,setUserrole}=authContext;
  const [editMode, setEditMode] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [Error, setError] = useState(null);
  const [accolite, setAccoliteid] = useState("");
  const header = "Bearer " + sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");
  const [read,setReadOnly] =useState(true);
  const[message,setMessage]=useState("");

  useEffect(() => {
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
        if(data){
          setAccoliteid(data.accoliteId)
          setUserrole(data.role)
        }
        
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8081/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
        Authorization: header,
      },
      body: accolite,
      
    }).then((res) => {
      if (!res.ok) {
        throw Error("Failed to update");
      }
      return res.json();
    }).then((data)=>{
      setMessage("User updated Successfully")
      setReadOnly(true)
      setTimeout(()=>{
        window.location.reload()
      },1000)
     
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

              <form className="profile-container" onSubmit={handleSubmit}>
                <div className="profile-item">
                  <label for="acccolite_id">Accolite ID</label>
                  <input
                    type="text"
                    placeholder="Enter Accolite Id"
                    name="accolite_id"
                    id="accolite_id"
                    onClick={()=>setReadOnly(false)}
                    required
                    readOnly={read}
                    value={accolite}
                    onChange={(e) => {
                      setAccoliteid(e.target.value);
                    }}
                  />
                </div>
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
                <span style={{fontSize:'small'}}>{message}</span>
{!read &&<button className="button-group" >
                  Edit
                </button>}
                
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
