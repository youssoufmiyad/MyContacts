import {Outlet, Navigate} from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const auth = Cookies.get('token') || null;

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;