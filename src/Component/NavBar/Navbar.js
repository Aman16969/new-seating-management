import { useState,useContext } from "react";
import seat from "../../Static/armchair.png";
import { Link } from "react-router-dom";
import accLogo from '../../Static/newlogo.png'
import AuthContext from "../../ContextApi/AuthContext";
const Navbar = () => {
  const authContext=useContext(AuthContext);
  const {userrole,setUserrole}=authContext;
  const role=sessionStorage.getItem("userRole");
  console.log(userrole)
  return (
    <>
      <nav className="navbar">
        <div className="navbar-wrapper">
          <div className="navbar-header-logo">
            {/* <img src={accLogo} alt="" className="acc-logo" /> */}
            <img className="acc-logo" style={{width: '182px',height: '64px'}} src="https://www.accolite.com/assets/jpg/homebannerimages/accolite-logo.svg" class="navbar-image" alt="Accolite Digital Logo"/>

            
          </div>
          {/* <span style={{ fontSize:'15px'}}>{sessionStorage.getItem("email")}</span> */}
          <div className="navbar-content">
            <ul className="inner-navbar">
              <li className="nav-item">
                <div className="menu-caption">
                <Link to="/">
                  <img src={seat} alt="" className="seat-header-img" />
                  </Link>
                 <p>Seating Management</p>
                  
                </div>
              </li>

              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <span className="span-logo"></span>
                  <span className="span-text">All Booking</span>
                </Link>
              </li>
              {role && role==="ADMIN" && <><li className="nav-item">
                <Link to="/location" className="nav-link">
                  <span className="span-logo"></span>
                  <span className="span-text">Location</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/userdetails" className="nav-link">
                  <span className="span-logo"></span>
                  <span className="span-text">Users</span>
                </Link>
              </li></>}
              
              
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <span className="span-logo"></span>
                  <span className="span-text">Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  <span className="span-logo"></span>
                  <span className="span-text">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
