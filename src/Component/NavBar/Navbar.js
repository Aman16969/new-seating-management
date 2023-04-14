const Navbar = () => {
    return ( <>
     <nav className="navbar">
      <div className="navbar-wrapper">
        <div className="navbar-header-logo">
          <img src="" alt="" />
          <span className="b-title">Accolite Digital</span>
        </div>
        <div className="navbar-content">
          <ul className="inner-navbar">
            <li className="nav-item menu-caption">
              <img src="armchair.png" alt="" className="seat-header-img" />
              <label className="seat-header" style={{fontWeight: '1500'}}>Seating Management</label>
            </li>

            <li className="nav-item">
              <a href="/" className="nav-link"
                ><span className="span-logo"
                  ><i className="feather icon-sidebar"></i></span
                ><span className="span-text">All Booking</span></a
              >
            </li>
            <li className="nav-item">
              <a href="location.html" className="nav-link"
                ><span className="span-logo"
                  ></span
                ><span className="span-text">Location</span></a
              >
            </li>
            <li className="nav-item">
                
              <a href="profile.html" className="nav-link"
                ><span className="span-logo"
                  ><i className="feather icon-sidebar"></i></span
                ><span className="span-text">Profile</span></a
              >
            </li>
            <li className="nav-item">
              <a href="logout.html" className="nav-link">
                <span className="span-logo"></span
                ><span className="span-text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </> );
}
 
export default Navbar;