/**
 * Home Page
 * 
 * Displays homepage banner, main CTA buttons, and a list of latest courses.
 * Uses CourseItem component for course cards (limited to 10 newest courses).
 * Registers toast setter on mount.
 */

import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import useInfiniteQuery from "../hooks/useInfiniteQuery";
import CourseItem from "../components/sections/CourseItem";
import PriceToPersian from "../utils/PriceToPersian";
import { resgisterToastSetter } from "../utils/ToastController";
import ToPersianDigit from "../utils/ToPersianDigit";
import { lazy } from "react";
const Spinner = lazy(() => import("../components/sections/Spinner"));

function Home() {
  useEffect(() => {
    document.title = "صفحه اصلی";
    resgisterToastSetter(setShowToast);
  }, []);

  const { allData, isLoading } = useInfiniteQuery(
    "courses",
    null,
    "/courses",
    null,
    false,
  );

  const [showToast, setShowToast] = useState({});

  return (
    <>
      <section className="flex flex-col">
        <div className="row flex flex-col lg:flex-row items-center">
          <div className="banner w-full lg:w-1/2 flex justify-center lg:order-2">
            <img src="/images/banner.jpeg" alt="" />
          </div>
          <div className="text mt-6 w-full lg:w-1/2">
            <h1 className="vazir-bold text-[23px] md:text-[40px] lg:text-[60px] mb-4 w-full">
              آموزش برنامه نویسی با سینگو لرن
            </h1>
            <h3 className="text-[#757575] text-[14px] md:text-[16px] lg:text-[18px]">
              آموزش هدفمند، پروژه محور و جامع برنامه نویسی همراه با پشتیبانی
              دائمی جزو استاندارد های آموزشی سینگو لرن است که بدون شک باعث ورود
              شما به بازار کار خواهد شد.
            </h3>
          </div>
        </div>

        <div className="row flex my-8 lg:my-4">
          <Button
            to="/courses"
            classes="bg-[var(--dark-purple)] flex text-white rounded-2xl items-center"
          >
            مشاهده دوره ها
            <svg
              className="mr-2"
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
          </Button>

          <Button
            to="/students-comments"
            classes="mr-4 bg-[var(--light-purple)] text-[var(--dark-purple)] py-2.5 px-5 rounded-2xl"
          >
            نظرات دانشجویان
          </Button>
        </div>
      </section>
      <main className="flex flex-col courses-wrapper mt-10">
        <div className="courses-wrapper_title flex justify-between items-center">
          <div className="title flex items-center">
           <img src="/svg/decoration.svg" alt="" />
            <h2 className="mr-3 text-lg lg:text-2xl">جدیدترین دوره ها</h2>
          </div>
          <Button
            to="/courses"
            classes="!p-0 text-[16px] lg:!text-lg text-[var(--dark-purple)] flex"
          >
            بیشتر
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              viewBox="0 0 20.884 27.105"
            >
              <path
                d="M9.358,6.463a5,5,0,0,1,8.388,0l4.347,6.7A5,5,0,0,1,17.9,20.884H9.205a5,5,0,0,1-4.194-7.722Z"
                transform="translate(0 27.105) rotate(-90)"
                fill="#7C3AED"
              ></path>
            </svg>
          </Button>
        </div>

        <div className="courses mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {allData &&
            allData.slice(0,10).map((course) => (
              <CourseItem
                key={course.id}
                title={course.title}
                courseId={course.id}
                price={
                  course.price == 0 ? "رایگان" : PriceToPersian(course.price)
                }
                icon={course.icon}
                duration={PriceToPersian(course.duration)}
                stdCount={PriceToPersian(course.studentsCount)}
                showToast={{ ...showToast }}
                originalPrice={
                  course?.originalPrice && PriceToPersian(course.originalPrice)
                }
                discount={course?.discount && ToPersianDigit(course.discount)}
                setShowToast={setShowToast}
              />
            ))}

          {isLoading && (
            <div className="flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export default Home;
