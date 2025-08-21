import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import useInfiniteQuery from "../hooks/useInfiniteQuery";
import CourseItem from "../components/sections/CourseItem";
import PriceToPersian from "../utils/PriceToPersian";
import { resgisterToastSetter } from "../utils/ToastController";
import ToPersianDigit from "../utils/ToPersianDigit";

function Home() {
  useEffect(() => {
    document.title = "صفحه اصلی";
    resgisterToastSetter(setShowToast);
  }, []);

  const { allData,} =
    useInfiniteQuery("courses", null, "/courses", null, false);

  const [showToast, setShowToast] = useState({});

  return (
    <>
      <section className="flex flex-col">
        <div className="row flex flex-col lg:flex-row items-center">
          <div className="banner w-full lg:w-1/2 flex justify-center lg:order-2">
            <img src="./public/images/banner.jpeg" alt="" />
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              viewBox="0 0 57 76"
            >
              <defs>
                <filter
                  id="a"
                  x="20"
                  y="0"
                  width="34"
                  height="34"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" input="SourceAlpha"></feOffset>
                  <feGaussianBlur stdDeviation="3" result="b"></feGaussianBlur>
                  <feFlood floodOpacity="0.161"></feFlood>
                  <feComposite operator="in" in2="b"></feComposite>
                  <feComposite in="SourceGraphic"></feComposite>
                </filter>
                <filter
                  id="c"
                  x="24"
                  y="30"
                  width="27"
                  height="27"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" input="SourceAlpha"></feOffset>
                  <feGaussianBlur stdDeviation="3" result="d"></feGaussianBlur>
                  <feFlood floodpacity="0.161"></feFlood>
                  <feComposite operator="in" in2="d"></feComposite>
                  <feComposite in="SourceGraphic"></feComposite>
                </filter>
                <filter
                  id="e"
                  x="0"
                  y="48"
                  width="28"
                  height="28"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" input="SourceAlpha"></feOffset>
                  <feGaussianBlur stdDeviation="3" result="f"></feGaussianBlur>
                  <feFlood floodOpacity="0.161"></feFlood>
                  <feComposite operator="in" in2="f"></feComposite>
                  <feComposite in="SourceGraphic"></feComposite>
                </filter>
                <filter
                  id="g"
                  x="33"
                  y="50"
                  width="24"
                  height="24"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" input="SourceAlpha"></feOffset>
                  <feGaussianBlur stdDeviation="3" result="h"></feGaussianBlur>
                  <feFlood floodOpacity="0.161"></feFlood>
                  <feComposite operator="in" in2="h"></feComposite>
                  <feComposite in="SourceGraphic"></feComposite>
                </filter>
              </defs>
              <g transform="translate(-1717 -1141)">
                <g transform="matrix(1, 0, 0, 1, 1717, 1141)" filter="url(#a)">
                  <rect
                    width="16"
                    height="16"
                    rx="5"
                    transform="translate(29 6)"
                    fill="#343434"
                    opacity="0.84"
                  ></rect>
                </g>
                <g transform="matrix(1, 0, 0, 1, 1717, 1141)" filter="url(#c)">
                  <rect
                    width="9"
                    height="9"
                    rx="3"
                    transform="translate(33 36)"
                    fill="#343434"
                    opacity="0.7"
                  ></rect>
                </g>
                <g transform="matrix(1, 0, 0, 1, 1717, 1141)" filter="url(#e)">
                  <rect
                    width="10"
                    height="10"
                    rx="3"
                    transform="translate(9 54)"
                    fill="#343434"
                    opacity="0.69"
                  ></rect>
                </g>
                <g transform="matrix(1, 0, 0, 1, 1717, 1141)" filter="url(#g)">
                  <rect
                    width="6"
                    height="6"
                    rx="2"
                    transform="translate(42 56)"
                    fill="#343434"
                    opacity="0.39"
                  ></rect>
                </g>
              </g>
            </svg>
            <h2 className="mr-3 text-2xl">جدیدترین دوره ها</h2>
          </div>
          <Button
            to="/courses"
            classes="!p-0 !text-lg text-[var(--dark-purple)] flex"
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
            allData
              .map((course) => (
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
                    course?.originalPrice &&
                    PriceToPersian(course.originalPrice)
                  }
                  discount={course?.discount && ToPersianDigit(course.discount)}
                  setShowToast={setShowToast}
                />
              ))}
        </div>
      </main>
    </>
  );
}
export default Home;
