import { Outlet, useLocation } from "react-router";
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
      icon: "../../../../public/svg/home.svg",
      text: "حساب کاربری",
    },
    {
      id: 2,
      to: "/dashboard/user/courses",
      icon: "../../../../public/svg/studentCat.svg",
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
