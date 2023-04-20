import Login from "./Component/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import "./App.css";
import Navbar from "./Component/NavBar/Navbar";
import Home from "./Component/Home/Home";
import { Auth } from "../src/ContextApi/AuthContext";
import Location from "./Component/Location/Location";
import Logout from "./Component/Auth/Logout";
import Profile from "./Component/Profile/Profile";
import UserDetails from "./Component/Admin/UserDetails";
import RoleRoutes from "./RoleRoutes";
import Admin from "./Component/Admin/Admin";
function App() {
  return (
    <div className="App">
 
      <Auth>
        <Router>
          <Routes>
            <Route
              element={
                <div>
                  <Navbar />
                  <PrivateRoutes />
                </div>
              }
            >
              <Route exact path="/" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route element={<RoleRoutes />}>
                <Route exact path="/location" element={<Location />} />
                <Route exact path="/userdetails" element={<UserDetails />} />
              </Route>
              <Route exact path="/admin" element={<Admin/>} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </Auth>
    </div>
  );
}

export default App;
