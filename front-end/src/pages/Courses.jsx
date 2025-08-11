import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import CourseItem from "../components/sections/CourseItem";
import useAxiosQuery from "../hooks/useAxiosQuery";
import { resgisterToastSetter } from "../utils/ToastController";
import PriceToPersian from "../utils/PriceToPersian";
import ToPersianDigit from '../utils/ToPersianDigit'

function Courses() {
  useEffect(() => {
    document.title = "دوره ها";
    resgisterToastSetter(setShowToast);
  }, []);

  const [isFilter, setIsFilter] = useState(false);

  const applyFilter = () => {
    setIsFilter((prev) => !prev);
  };

  const [showToast, setShowToast] = useState({});

  const { data, isError, isPending } = useAxiosQuery(
    "courses",
    null,
    "/courses",
    null,
    false
  );

  return (
    <>
      <div className="course-wrapper flex flex-col justify-between items-center">
        <div className="md:w-full flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="title flex flex-col lg:flex-row mb-5">
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
                  <feFlood floodOpacity="0.161"></feFlood>
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
            <h2 className="text-2xl">دوره های آموزش برنامه نویسی</h2>
          </div>
          <div className="filter flex items-center">
            <Button
              onclick={applyFilter}
              classes="rounded-2xl duration-300 transition relative w-[65px] h-[30px] bg-[var(--light-gray)] ml-5"
            >
              <span
                className={`rounded-full bg-black w-[20px] h-[20px] absolute top-1/6 duration-300 transition ${
                  isFilter ? "right-2" : "left-2"
                } inline-block`}
              ></span>
            </Button>
            <p>دوره های رایگان</p>
          </div>
        </div>

        <div className="courses mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 w-full">
          {!isFilter
            ? data &&
              data.map((course) => (
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
                  originalPrice={
                    course?.originalPrice && PriceToPersian(course.originalPrice)
                  }
                  discount={course?.discount && ToPersianDigit(course.discount)}
                  showToast={{ ...showToast }}
                  setShowToast={setShowToast}
                />
              ))
            : data &&
              data
                .filter((course) => course.price == 0)
                .map((course) => (
                  <CourseItem
                    key={course.id}
                    title={course.title}
                    courseId={course.id}
                    price={
                      course.price == 0
                        ? "رایگان"
                        : PriceToPersian(course.price)
                    }
                    icon={course.icon}
                    duration={PriceToPersian(course.duration)}
                    stdCount={PriceToPersian(course.studentsCount)}
                    showToast={{ ...showToast }}
                    setShowToast={setShowToast}
                  />
                ))}
        </div>
      </div>
    </>
  );
}
export default Courses;
