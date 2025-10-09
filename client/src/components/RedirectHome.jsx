import {Outlet, Navigate} from "react-router-dom";
import Cookies from "js-cookie";

const RedirectHome = () => {
  const auth = Cookies.get('token') || null;

  if (auth) {
    return <Navigate to="/contacts" replace />;
  }

  return <Outlet />;
}

export default RedirectHome;