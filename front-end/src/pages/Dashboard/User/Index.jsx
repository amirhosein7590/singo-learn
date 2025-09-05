/**
 * User Dashboard Main Layout
 * ----------------------------------------
 * This is the main layout component for the User Panel.
 * It wraps all user routes and provides a sidebar with navigation links
 * and a main content area that renders the currently selected route.
 *
 * @component
 * @returns {JSX.Element} User dashboard layout with sidebar and outlet for nested routes.
 *
 * @description
 * - Fetches the user profile using `useAxiosQuery` with userId and token from localStorage.
 * - Defines sidebar links for "Account" and "My Courses".
 * - Renders `DashboardSideBar` on the left and an `Outlet` for nested routes on the right.
 * - Uses `memo` to prevent unnecessary re-renders if props/state remain unchanged.
 * - Converts phone numbers to Persian digits using `ToPersianDigit` utility.
 */


import { Outlet } from "react-router";
import DashboardSideBar from "../../../components/sections/DashboardSideBar";
import useAxiosQuery from "../../../hooks/useAxiosQuery";
import ToPersianDigit from "../../../utils/ToPersianDigit";
import { memo } from "react";

function Index() {
  const { userId, token } = JSON.parse(localStorage.getItem("userInfos"));
  const reqHeader = { Authorization: `Bearer ${token}` };
  const { data } = useAxiosQuery(
    "user",
    null,
    `/users/${userId}`,
    {reqHeader},
    true
  );

  const links = [
    {
      id: 1,
      to: "/dashboard/user",
      icon: "/svg/home.svg",
      text: "حساب کاربری",
    },
    {
      id: 2,
      to: "/dashboard/user/courses",
      icon: "/svg/studentCat.svg",
      text: "دوره های من",
    },
  ];

  return (
    <div className="wrapper flex flex-col lg:flex-row lg:justify-between">
      <aside className="w-full lg:w-5/24">
        <DashboardSideBar
          links={links}
          fullname={data && data.fullname}
          phonenumber={data && ToPersianDigit(data.phonenumber)}
        />
      </aside>

      <main className="w-full lg:w-19/24 lg:mr-5">
        <Outlet context={data && data.fullname} />
      </main>
    </div>
  );
}

export default memo(Index);
