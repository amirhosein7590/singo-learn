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
      icon: "../../../../public/svg/home.svg",
    },
    {
        id : 2,
        to: "/dashboard/admin/teachers",
        text : "مدرسان",
        icon : "../../../../public/svg/teacher.svg"
    },
    {
        id : 3,
        to: "/dashboard/admin/courses",
        text : "دوره ها",
        icon : "../../../../public/svg/online-course.svg"
    },
    {
        id : 4,
        to: "/dashboard/admin/users",
        text : "کاربران",
        icon : "../../../../public/svg/users.svg"
    },
    {
        id : 5,
        to: "/dashboard/admin/sessions",
        text : "جلسات",
        icon : "../../../../public/svg/sessions.svg"
    },
    {
        id : 6,
        to: "/dashboard/admin/offs",
        text : "تخفیف ها",
        icon : "../../../../public/svg/discount.svg"
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
