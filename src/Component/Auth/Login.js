import { configure } from "@testing-library/react";
import logo from "../../Static/logo.jpg";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../ContextApi/AuthContext";
import book from "../../Static/book.jpg";
const Login = () => {
  const navigate = useNavigate();
  const contextType = useContext(AuthContext);
  const { setToken, token, accessToken, updateaccessToken, updatetoken } =
    contextType;
  const [error, setError] = useState("");
  useEffect(() => {
    /* global google */
    const onGoogleScriptLoad = () => {
      google.accounts.id.initialize({
        client_id:
          "946965422673-l41tegruelb9vqb1q6iqrpaf0ha7vnvh.apps.googleusercontent.com",
        callback: handleLoginApi,
      });
      google.accounts.id.renderButton(document.getElementById("LoginButton"), {
        theme: "outline",
        size: "large",
        type: "standard",
        
      });
    };
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = onGoogleScriptLoad;
    document.body.appendChild(script);
  }, []);
  const handleLoginApi = (response) => {
    fetch(`http://localhost:8081/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        updateaccessToken(data);
        if (data.length !== 0) {
          var expirationTime = new Date();
          expirationTime.setTime(
            expirationTime.getTime() + 12 * 60 * 60 * 1000
          );
          var cookieValue = data.id + "|" + data.email + "|" + data.token;
          document.cookie =
            "userdata=" +
            cookieValue +
            ";expires=" +
            expirationTime.toUTCString() +
            ";path=/";
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("accessToken", data.accessToken);
          sessionStorage.setItem("userId", data.id);
          sessionStorage.setItem("userRole", data.role);
          console.log(data.accessToken);
          navigate("/", true);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>

      <div className="container-login">
        <div className="header">
        <style>
         @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
         @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap')
        </style>

          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="login-button">
           <div id="LoginButton"></div>
          </div>
        </div>
        <div className="girlbook">
        <img className="book" src={book} alt= "book" width="500" height="300" />
        </div>
        <span className="heading"> <h1 >Book your</h1> </span>
          <span className="heading2"> <h3>seats now!</h3></span>
        
        {/* <div className="seatlogo">
       <center> <img src={seat_transparent} alt= "seat_transparent" width="500" height="300" /></center>
        </div> */}

        <div className="content">
        {/* <h1 style={{color:"white"}}>Seating Management System</h1> */}
          {error && <div>{error}</div>}
          {accessToken && <div>{accessToken.email}</div>}
        
         
        </div>
      
      </div>
    </>
  );
};

export default Login;
