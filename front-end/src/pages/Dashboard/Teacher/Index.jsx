/**
 * Teacher Dashboard Main Layout
 * ----------------------------------------
 * This is the main layout component for the Teacher Panel.
 * It wraps all teacher routes and provides a sidebar with navigation links
 * and a main content area that renders the currently selected route.
 *
 * @component
 * @returns {JSX.Element} Teacher dashboard layout with sidebar and outlet for nested routes.
 *
 * @description
 * - Fetches the teacher profile using `useGetProfile` hook to get fullname and phone number.
 * - Defines sidebar links for "Account" and "Sessions".
 * - Renders `DashboardSideBar` on the left and an `Outlet` for nested routes on the right.
 * - Uses `memo` to prevent unnecessary re-renders if props/state remain unchanged.
 * - Converts phone numbers to Persian digits using `ToPersianDigits` utility.
 */


import { Outlet } from "react-router";
import DashboardSideBar from "../../../components/sections/DashboardSideBar";
import ToPersianDigits from "../../../utils/ToPersianDigit";
import { memo } from "react";
import useGetProfile from "../../../hooks/Teacher/useGetProfile";

function Index() {
  const {data} = useGetProfile()
  const links = [
    {
      id: 1,
      to: "/dashboard/teacher",
      icon: "/svg/home.svg",
      text: "حساب کاربری",
    },
    {
      id: 2,
      to: "/dashboard/teacher/sessions",
      icon: "/svg/sessions.svg",
      text: "جلسات",
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

export default memo(Index)
