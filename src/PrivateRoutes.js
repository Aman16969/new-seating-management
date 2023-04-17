import { Outlet, Navigate } from "react-router-dom";

const checkToken = () => {
  let token = sessionStorage.getItem("accessToken");
  console.log(token);
  return token ? true : false;
};
const PrivateRoutes = () => {
  const isAuthenticated = checkToken();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
