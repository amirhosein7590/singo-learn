import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

function withAuth(Component) {
  return function AuthWrapper(props) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const userInfos = JSON.parse(localStorage.getItem("userInfos"));

      if (!userInfos?.role) {
        return navigate("/login");
      }

      const currentRole = location.pathname.split("/")[2]
      console.log(currentRole);
      if (userInfos.role !== currentRole) {
        return navigate("/");
      }
    }, [location]);

    return <Component {...props} />;
  };
}

export default withAuth;
