/**
 * User Courses Page
 * ----------------------------------------
 * This component displays all courses purchased by the user.
 *
 * @component
 * @returns {JSX.Element} List of purchased courses or an empty state with a CTA.
 *
 * @description
 * - Fetches purchased courses using `useAxiosQuery` with userId and token from localStorage.
 * - Sets document title to "دوره های من" on mount.
 * - If the user has purchased courses:
 *    - Maps over `purchasedCourses.courses` and renders a `UserCourseItem` for each course.
 * - If the user has not purchased any courses:
 *    - Displays a friendly empty state with an image and a button to browse courses.
 * - Uses `memo` to avoid unnecessary re-renders if props/state remain unchanged.
 */


import {memo, useEffect} from "react";
import useAxiosQuery from "../../../hooks/useAxiosQuery";
import UserCourseItem from "../../../components/sections/UserCourseItem";
import Button from "../../../components/ui/Button";

function UserCourses() {
  const { userId, token } = JSON.parse(localStorage.getItem("userInfos"));
  const reqHeader = { Authorization: `Bearer ${token}` };

  const { data: purchasedCourses } = useAxiosQuery(
    "purchase",
    null,
    `/user-courses/${userId}`,
    {
      reqHeader,
    },
    true
  );

  useEffect(()=>{
    document.title = 'دوره های من'
  },[])

  return (
    <>
      {purchasedCourses?.courses.length > 0 ? (
        <>
          {purchasedCourses.courses.map((course) => (
            <UserCourseItem
              key={course.id}
              title={course.title}
              id={course.id}
              icon={course.icon}
            />
          ))}
        </>
      ) : (
        <div className="empty-basket flex flex-col items-center my-12 lg:mt-0">
          <p className="text-center text-sm lg:text-lg mb-7">
            متاسفانه شما هیچ دوره ای خریداری نکرده اید
          </p>
          <div className="image_wrapper">
            <img src="/images/empty-basket.webp" alt="" />
          </div>

          <div className="button_wrapper bg-[var(--dark-purple)] text-white flex justify-center mt-8 rounded-xl py-2.5 lg:py-0 px-4">
            <Button to="/courses">ثبت نام و شروع برنامه نویسی</Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              viewBox="0 0 20.884 27.105"
            >
              <path
                d="M9.358,6.463a5,5,0,0,1,8.388,0l4.347,6.7A5,5,0,0,1,17.9,20.884H9.205a5,5,0,0,1-4.194-7.722Z"
                transform="translate(0 27.105) rotate(-90)"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(UserCourses);
