import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import DefaultLayout from "./layouts/defaultLayout";
import StudentsCommnets from './pages/StudentsComments'
import ForgotPassword from "./pages/Auth/ForgotPassword";

import Cart from './pages/Cart'
const routes = [
    {element : <DefaultLayout /> , children : [
        {path : '/' , element : <Home />},
        {path : '/login' , element : <Login />},
        {path : '/register' , element : <Register />},
        {path : '/forgot-password' , element : <ForgotPassword />},
        {path : '/courses/*' , element : <Courses />},
        {path : '/courses/:courseId' , element : <Course />},
        {path : '/about-us' , element : <AboutUs />},
        {path : '/dashboard/*' , element : <Dashboard /> , children : [
            // {path : 'user' , element : <></> , children : []},
            // {path : 'teacher' , element : <></> , children : []},
            // {path : 'admin' , element : <></> , children : []}

            // these routes will completed later
        ]},
        {path : '/cart' , element : <Cart />},
        {path : '/students-comments' , element : <StudentsCommnets />}
    ]}
]

export default routes
