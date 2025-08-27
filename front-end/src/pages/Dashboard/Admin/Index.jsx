/**
 * Admin dashboard main layout component.
 *
 * This component defines the base structure of the admin panel.
 * It includes a sidebar on the right side
 * that contains navigation links the admin is authorized to access.
 * 
 * The main content area uses React Router's `Outlet` to render the 
 * current active route, based on the links provided in the sidebar.
 *
 * Data about the admin user (fullname and phone number) is fetched 
 * through a custom hook (`useAxiosQuery`) using the stored `userId` 
 * and `token` from localStorage. These values are then passed down 
 * to the sidebar for display.
 *
 * @component
 *
 * @example
 * return (
 *   <Admin />
 * )
 *
 * @returns {JSX.Element} Admin panel layout with sidebar and main content area.
 *
 * @remarks
 * - Sidebar receives its navigation links through the `links` array.
 * - User data is fetched from `/users/:userId` endpoint.
 * - Phone number is converted to Persian digits using `ToPersianDigits` util.
 * - `Outlet` renders nested routes (e.g., account, teachers, courses, etc.).
 *
 * @see DashboardSideBar
 * @see useAxiosQuery
 * @see ToPersianDigits
 */


import DashboardSideBar from "../../../components/sections/DashboardSideBar";
import { Outlet } from "react-router";
import useAxiosQuery from "../../../hooks/useAxiosQuery";
import ToPersianDigits from "../../../utils/ToPersianDigit";

function Admin() {
  const { userId, token } = JSON.parse(localStorage.getItem("userInfos"));
  const reqHeader = { Authorization: `Bearer ${token}` };
  const { data } = useAxiosQuery(
    "user",
    null,
    `/users/${userId}`,
    { reqHeader },
    true
  );
  const links = [
    {
      id: 1,
      to: "/dashboard/admin",
      text: "حساب کاربری",
      icon: "/svg/home.svg",
    },
    {
        id : 2,
        to: "/dashboard/admin/teachers",
        text : "مدرسان",
        icon : "/svg/teacher.svg"
    },
    {
        id : 3,
        to: "/dashboard/admin/courses",
        text : "دوره ها",
        icon : "/svg/online-course.svg"
    },
    {
        id : 4,
        to: "/dashboard/admin/users",
        text : "کاربران",
        icon : "/svg/users.svg"
    },
    {
        id : 5,
        to: "/dashboard/admin/sessions",
        text : "جلسات",
        icon : "/svg/sessions.svg"
    },
    {
        id : 6,
        to: "/dashboard/admin/offs",
        text : "تخفیف ها",
        icon : "/svg/discount.svg"
    },
  ];

  return (
    <div className="wrapper flex flex-col lg:flex-row lg:justify-between">
      <aside className="w-full lg:w-5/24">
        <DashboardSideBar
          links={links}
          fullname={data && data.fullname}
          phonenumber={data && ToPersianDigits(data.phonenumber)}
        />
      </aside>

      <main className="w-full lg:w-19/24 lg:mr-5">
        <Outlet context={data && data.fullname} />
      </main>
    </div>
  );
}

export default Admin;
