import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import accLogo from "../../Static/newlogo.png";
import Acco from "../../Static/Acco.png";
import AuthContext from "../../ContextApi/AuthContext";
import seat_transparent from "../../Static/seat transparent.png";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { userrole, setUserrole } = authContext;
  const role = sessionStorage.getItem("userRole");
  console.log(userrole);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-wrapper">
          <ul
            className="inner-navbar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <li className="navbar-header-logo">
              <img src={accLogo} alt="" className="acc-logo" />
            </li>
            <li className="nav-item">
              <Link to="/">
                {" "}
                <span className="span-text">All Booking</span>
              </Link>
            </li>
            {role && role === "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link to="/location" className="nav-link">
                    <span className="span-logo"></span>
                    <span className="span-text">Location</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">
                    <span className="span-logo"></span>
                    <span className="span-text">Admin</span>
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <div className="dropdown">
                <div class="dropbtn">
                  Profile
                  <i class="fa fa-caret-down"></i>
                </div>
                <div className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <Link to="/logout">Logout</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
