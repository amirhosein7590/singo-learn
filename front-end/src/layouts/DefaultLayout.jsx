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
