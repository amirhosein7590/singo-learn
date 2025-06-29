import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import DefaultLayout from "./layouts/defaultLayout";
import StudentsCommnets from './pages/StudentsComments'

import Cart from './pages/Cart'
const routes = [
    {element : <DefaultLayout /> , children : [
        {path : '/' , element : <Home />},
        {path : '/login' , element : <Login />},
        {path : '/register' , element : <Register />},
        {path : '/courses/*' , element : <Courses />},
        {path : '/courses/:id' , element : <Course />},
        {path : '/about-us' , element : <AboutUs />},
        {path : '/dashboard' , element : <Dashboard />},
        {path : '/cart' , element : <Cart />},
        {path : '/students-comments' , element : <StudentsCommnets />}
    ]}
]

export default routes
