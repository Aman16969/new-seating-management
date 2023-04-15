import { configure } from "@testing-library/react";
import logo from "../../Static/logo.jpg";
import { useState, useEffect,useContext, } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../ContextApi/AuthContext";
const Login = () => {
  const navigate=useNavigate();
  const contextType=useContext(AuthContext);
  const {setToken,token,accessToken,updateaccessToken,updatetoken}=contextType;
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
          updateaccessToken(data)
          if (data.length !== 0) {
            localStorage.setItem("email", data.email);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("userId", data.id);
            console.log(data)
            navigate("/home",true)
            
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
          {error && <div>{error}</div>}
          {accessToken && <div>{accessToken.email}</div>}
          <h1>Welcome to Our Innovative Digital Transformation Services!</h1>
          <p>
            At our company, we believe in approaching complex digital challenges
            with an innovative design thinking approach. We work hand-in-hand
            with Fortune 500 clients to simplify their digital journeys, driving
            their success in today's fast-paced, technology-driven world.
          </p>
          <h3>Our People Are Our Strength</h3>
          <p>
            At the heart of our business is our talented team of world-class
            technologists who are passionate about helping our clients overcome
            their most pressing technology challenges. With their expertise, we
            guide our clients from vision to reality, empowering them to respond
            to disruptive technologies and stay ahead of the curve.
          </p>
          <h3>Success Is Our Priority</h3>
          <p>
            We are committed to delivering exceptional value to our clients by
            focusing on their success. Our core value of driving customer
            success is the driving force behind everything we do. We collaborate
            closely with our clients to understand their unique needs and
            deliver customized digital solutions that enable them to thrive in
            the digital landscape.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
