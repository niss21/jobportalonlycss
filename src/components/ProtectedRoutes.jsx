import { Navigate, Outlet } from "react-router-dom";
import ForbiddenPage from "../pages/ForbiddenPage";

function ProtectedRoutes(props) {
  const role = localStorage.getItem("role");

  if(props.check === "profile"){
    if(role){
      return <Outlet />
    }
    else{
      return <Navigate to="/login" />;
    }
  }

  if(props.check === "formpage"){
    if(role){
      return <ForbiddenPage />;
    }
    else{
      return <Outlet />
    }
  }

  if (role) {
    if (props.role === role) {
      return <Outlet />;
    }
    return <ForbiddenPage />;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoutes;
