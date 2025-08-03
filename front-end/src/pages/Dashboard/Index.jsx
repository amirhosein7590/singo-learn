import { Outlet } from "react-router"
import withAuth from "../../HOC/withAuth"

function Index() {
  return <Outlet />
}

export default withAuth(Index)