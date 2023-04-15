import seat from "../../Static/armchair.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-wrapper">
          <div className="navbar-header-logo">
            <img src="" alt="" />
            <span className="b-title">Accolite Digital</span>
          </div>
          <div className="navbar-content">
            <ul className="inner-navbar">
              <li className="nav-item">
                <div className="menu-caption">
                  <img src={seat} alt="" className="seat-header-img" />

                  <p>Seating Management</p>
                </div>
              </li>

              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <span className="span-logo"></span>
                  <span className="span-text">All Booking</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/location" className="nav-link">
                  <span className="span-logo"></span>
                  <span className="span-text">Location</span>
                </Link>
              </li>
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
