import { useLocation, Navigate } from "react-router";
/**
 * Higher-Order Component for authentication and role-based access control
 *
 * @param {React.ComponentType} Component - Component to wrap with auth protection
 * @returns {React.ComponentType} Component with authentication checks
 *
 * @example
 * // Protect a component based on user role
 * const AdminDashboard = withAuth(DashboardComponent);
 */

function withAuth(Component) {
  /**
   * Authentication wrapper that checks user credentials and role permissions
   *
   * @param {Object} props - Component props
   * @returns {React.Element} Either rendered component or redirect navigation
   */

  return function AuthWrapper(props) {
    const location = useLocation();
    // Get user info from localStorage (assuming structure: {role: string, token: string})

    const userInfos = JSON.parse(localStorage.getItem("userInfos"));
    // Redirect to login if no user role exists (user not authenticated)

    if (!userInfos?.role) {
      return <Navigate to={"/login"} replace={true} />;
    }
    // Extract required role from URL path (assumes format: /some-path/:role/component)
    // Original logic: gets third segment of URL path
    const currentRole = location.pathname.split("/")[2];
    // Redirect to homepage if user role doesn't match required role from URL

    if (userInfos.role !== currentRole) {
      return <Navigate to={"/"} replace={true} />;
    }
    // Render protected component if all checks pass

    return <Component {...props} />;
  };
}

export default withAuth;
