import { Outlet } from "react-router"
import Nav from "../components/sections/Nav"
import Footer from "../components/sections/Footer"

function DefaultLayout() {
  return (
    <>
    <header className="sticky z-100 top-0 w-10/12 lg:w-8/12 mx-auto mb-10">
    <Nav />
    </header>
    <div className="container w-10/12 lg:w-8/12 mx-auto">
    <Outlet />
    <Footer />
    </div>
    </>
  )
}

export default DefaultLayout