import Login from "./Component/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import "./App.css";
import Navbar from "./Component/NavBar/Navbar";
import Home from "./Component/Home/Home";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
