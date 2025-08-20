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
      icon: "../../../../public/svg/home.svg",
      text: "حساب کاربری",
    },
    {
      id: 2,
      to: "/dashboard/teacher/sessions",
      icon: "../../../../public/svg/sessions.svg",
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
