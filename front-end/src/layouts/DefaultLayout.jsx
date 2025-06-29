import { Outlet } from "react-router"
import Nav from "../components/sections/Nav"

function DefaultLayout() {
  return (
    <>
    <header className="sticky top-0 w-10/12 lg:w-8/12 mx-auto mb-10">
    <Nav />
    </header>
    <div className="container w-10/12 lg:w-8/12 mx-auto">
    <Outlet />
    </div>
    </>
  )
}

export default DefaultLayout