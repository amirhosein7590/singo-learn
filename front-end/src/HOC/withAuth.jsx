import { useEffect } from "react";
import { useLocation, Navigate } from "react-router";

function withAuth(Component) {
  return function AuthWrapper(props) {
    const location = useLocation();
    const userInfos = JSON.parse(localStorage.getItem("userInfos"));

    if (!userInfos?.role) {
      return <Navigate to={"/login"} replace={true} />;
    }

    const currentRole = location.pathname.split("/")[2];
    if (userInfos.role !== currentRole) {
      return <Navigate to={"/"} replace={true} />;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
