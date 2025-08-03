import { Outlet, useLocation } from "react-router";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";
import { useEffect } from "react";

function DefaultLayout() {
  const userInfos = JSON.parse(localStorage.getItem("userInfos")) || {};
  const {pathname} = useLocation();
  useEffect(()=>{
    window.scrollTo({top : 0 , behavior : 'smooth'})
  },[pathname])

  return (
    <>
      <header className="sticky z-100 bg-white top-0 mb-10">
        <Nav userInfos={userInfos} />
      </header>
      <div className="container w-10/12 mx-auto">
        <Outlet userInfos={userInfos} />
        <Footer userInfos={userInfos} />
      </div>
    </>
  );
}

export default DefaultLayout;
