/**
 * Dashboard Layout Component
 *
 * @component
 * @description
 * This component serves as the **main wrapper (layout)** for all protected dashboard routes.
 * It is responsible for:
 *
 * - Acting as a container for all nested dashboard routes using `react-router`'s `<Outlet>`.
 * - Ensuring that only authenticated users with proper roles can access the dashboard,
 *   by being wrapped with the `withAuth` Higher-Order Component (HOC).
 * - Providing a central entry point where different dashboard sections (e.g., Admin, Teacher, User panels)
 *   will be rendered based on the route definition and user role.
 *
 * ## Key Features:
 * 1. **Route Protection**  
 *    - `withAuth` HOC ensures that only authorized users can access dashboard routes.  
 *    - Handles role-based access control (RBAC) to prevent unauthorized access.
 *
 * 2. **Nested Route Rendering**  
 *    - `<Outlet>` dynamically renders the child routes defined in the routing configuration.  
 *    - For example, `/dashboard/admin` or `/dashboard/teacher` will load inside this layout.
 *
 * 3. **Scalability**  
 *    - Serves as a reusable layout for multiple user roles.  
 *    - Centralizes access control logic and layout structure for the entire dashboard.
 *
 * ## Example Usage:
 * ```jsx
 * {
 *   path: "/dashboard",
 *   element: <Index />, // Protected by withAuth
 *   children: [
 *     { path: "admin", element: <Admin /> },
 *     { path: "teacher", element: <Teacher /> },
 *     { path: "user", element: <User /> }
 *   ]
 * }
 * ```
 *
 * In this setup:
 * - All `/dashboard/*` routes will go through this component.  
 * - Unauthorized users will be redirected before accessing child routes.  
 * - Authorized users will see the corresponding nested component.
 *
 * @returns {JSX.Element} Rendered dashboard layout with authentication protection.
 */


import { Outlet } from "react-router"
import withAuth from "../../HOC/withAuth"

function Index() {
  return <Outlet />
}

export default withAuth(Index)