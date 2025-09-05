import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DefaultLayout from "./layouts/DefaultLayout";
import StudentsCommnets from './pages/StudentsComments'
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from './pages/Dashboard/Index'
import User from './pages/Dashboard/User/Index'
import UserCourses from './pages/Dashboard/User/UserCourses'
import UserAccount from './pages/Dashboard/User/UserAccount'
import Admin from './pages/Dashboard/Admin/Index'
import AdminAccount from "./pages/Dashboard/Admin/Account";
import ManageTeachers from "./pages/Dashboard/Admin/ManageTeachers";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";
import Offs from "./pages/Dashboard/Admin/Offs";
import Sessions from "./pages/Dashboard/Admin/Sessions";
import ManageCourses from "./pages/Dashboard/Admin/ManageCourses";
import Teacher from './pages/Dashboard/Teacher/Index'
import TeacherAccount from './pages/Dashboard/Teacher/Account'
import TeacherSessions from './pages/Dashboard/Teacher/Sessions'

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
        {path : 'dashboard/*' , element : <Dashboard /> , children : [
            {path : 'user' , element : <User /> , children : [
                {index : true , element : <UserAccount />},
                {path : 'courses' , element : <UserCourses />}
            ]},
            {path : 'admin' , element : <Admin /> , children : [
                {index : true , element : <AdminAccount />},
                {path : 'teachers' , element : <ManageTeachers />},
                {path : 'users' , element : <ManageUsers /> },
                {path : 'offs' , element : <Offs />},
                {path : 'sessions' , element : <Sessions />},
                {path : 'courses' , element : <ManageCourses />}
            ]},
            {path : 'teacher' , element : <Teacher /> , children : [
                {index : true, element : <TeacherAccount />},
                {path : 'sessions' , element : <TeacherSessions />}
            ]}
        ]},
        {path : '/cart' , element : <Cart />},
        {path : '/students-comments' , element : <StudentsCommnets />}
    ]}
]

export default routes
