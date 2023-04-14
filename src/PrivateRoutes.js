import { Outlet, Navigate } from "react-router-dom";

const checkToken = () => {
  let token = localStorage.getItem("accessToken");
  console.log(token);
  return token ? true : false;
  console.log(token);
};
const PrivateRoutes = () => {
  const isAuthenticated = checkToken();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
