import Login from "./Component/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import "./App.css";
import Navbar from "./Component/NavBar/Navbar";
import Home from "./Component/Home/Home";
import { Auth } from "../src/ContextApi/AuthContext";
import Location from "./Component/Location/Location";
import Profile from "./Component/Profile/Profile";
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
              <Route path="/" element={<Home />} />
              <Route path="/location" element={<Location />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Auth>
    </div>
  );
}

export default App;
