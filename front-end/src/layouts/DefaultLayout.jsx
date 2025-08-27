/**
 * DefaultLayout component that wraps the application with a navigation bar, footer, and outlet for nested routes.
 *
 * @component
 *
 * @example
 * // Usage inside a router setup
 * <Route element={<DefaultLayout />}>
 *   <Route path="/home" element={<HomePage />} />
 * </Route>
 *
 * @returns {JSX.Element} A layout containing a sticky header with navigation, main content outlet, and footer.
 */

/**
 * useEffect hook inside DefaultLayout.
 * Scrolls the window to the top whenever the pathname changes.
 *
 * @function
 * @param {string} pathname - The current URL path from React Router's useLocation.
 */


import { Outlet, useLocation } from "react-router";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";
import { memo, useEffect } from "react";

function DefaultLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <header className="sticky z-100 bg-white top-0 mb-10">
        <Nav />
      </header>
      <div className="container w-10/12 mx-auto">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default memo(DefaultLayout);
