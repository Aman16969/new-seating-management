import { configure } from "@testing-library/react";
import logo from "../../Static/logo.jpg";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../ContextApi/AuthContext";
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
    console.log(response.credential)
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
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="login-button">
            <div id="LoginButton"></div>
          </div>
        </div>
        <div className="title">
          <h1>Accolite Digital</h1>
        </div>
        <div className="content">
        <h1 style={{color:"orange"}}>Seating Management System</h1>
          {error && <div>{error}</div>}
          {accessToken && <div>{accessToken.email}</div>}
          {/* <h1>Welcome to Our Innovative Digital Transformation Services!</h1> */}
          <p>
          Welcome to our seat management system! This platform is designed to help you book a desk or workspace when you need to work from the office. By reserving your workspace in advance, you can ensure that you have a comfortable and productive environment to get your work done.
          </p>
          <br />
          <p>
          Using our system is easy and intuitive. Simply log in with your company credentials, select the date and time you plan to work from the office, and choose the workspace that suits your needs.
          </p>
          <br />
          <p>
          Thank you for using our seat management system. We hope you find it helpful and convenient!
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
