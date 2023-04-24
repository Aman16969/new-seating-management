import { configure } from "@testing-library/react";
import logo from "../../Static/logo.jpg";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import book from "../../Static/book.jpg";
const Login = () => {
  const navigate = useNavigate();

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
        console.log(data)
        if (data.length !== 0) {
          var expirationTime = new Date();
          expirationTime.setTime(
            expirationTime.getTime() + 24 * 60 * 60 * 1000
          );
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("accessToken", data.accessToken);
          sessionStorage.setItem("userId", data.id);
          sessionStorage.setItem("userFirstName",data.firstName)
          sessionStorage.setItem("userLastName",data.lastName)
          sessionStorage.setItem("userRole", data.role);
          sessionStorage.setItem("userLocation", data.location);
          sessionStorage.setItem("userLocationId",data.location.id)

          if(data.location==null){
            navigate("/profile",true)
          }
          else{
            navigate("/", true);
          }
          
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
        <div className="girlbook">
          <img
            className="book"
            src={book}
            alt="book"
            width="500"
            height="300"
          />
        </div>
        <span className="heading">
          {" "}
          <h1>Book your</h1>{" "}
        </span>
        <span className="heading2">
          {" "}
          <h3>seats now!</h3>
        </span>
        <div className="content">
          {error && <div>{error}</div>}
                  </div>
      </div>
    </>
  );
};

export default Login;
