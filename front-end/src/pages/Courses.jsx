/**
 * Courses Page
 * 
 * Displays a list of courses with infinite scroll and optional free-course filter.
 * Uses CourseItem component for individual course cards.
 * Registers toast setter on mount.
 */

import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import CourseItem from "../components/sections/CourseItem";
import useInfiniteQuery from "../hooks/useInfiniteQuery";
import { resgisterToastSetter } from "../utils/ToastController";
import PriceToPersian from "../utils/PriceToPersian";
import ToPersianDigit from "../utils/ToPersianDigit";
import { lazy } from "react";
const Spinner = lazy(() => import("../components/sections/Spinner"));

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

  const { allData, isLoading, loadMoreRef, isFetchingNextPage } =
    useInfiniteQuery("courses", null, "/courses", null, false);

  return (
    <>
      <div className="course-wrapper flex flex-col justify-between items-center">
        <div className="md:w-full flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="title flex flex-row mb-5">
            <img src="/svg/decoration.svg" alt="" />
            <h2 className="text-lg mr-2 lg:text-2xl">دوره های آموزش برنامه نویسی</h2>
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
            ? allData &&
              allData.map((course) => (
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
                    course?.originalPrice &&
                    PriceToPersian(course.originalPrice)
                  }
                  discount={course?.discount && ToPersianDigit(course.discount)}
                  showToast={{ ...showToast }}
                  setShowToast={setShowToast}
                />
              ))
            : allData &&
              allData
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

          <div ref={loadMoreRef} className="observer opacity-0 w-1 h-2"></div>
          {isFetchingNextPage && (
            <div className="flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Courses;
