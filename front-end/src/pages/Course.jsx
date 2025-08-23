import { useNavigate, useParams } from "react-router";
import useCart from "../hooks/useCart";
import useAxiosQuery from "../hooks/useAxiosQuery";
import CourseIconInfo from "../components/sections/CourseIconInfo";
import PriceToPersian from "../utils/PriceToPersian";
import Button from "../components/ui/Button";
import { lazy, memo, useEffect, useState } from "react";
import {
  resgisterToastSetter,
  showToastHandler,
} from "../utils/ToastController";
const Toast = lazy(() => import("../components/sections/Toast"));
import WhatIsCard from "../components/sections/WhatIsCard";
import Session from "../components/sections/Accordions/Session/Index";
import Faqs from "../components/sections/Accordions/Faqs";
import faqsData from "../data/Faqs";

function Course() {
  const { courseId } = useParams();

  const {
    isPurchasedCourse,
    isInCart,
    addToCart,
    addCartData,
    addCartError,
    addCartPending,
  } = useCart();

  const {
    data: course,
    isPending,
    isError,
  } = useAxiosQuery(
    "course",
    courseId,
    `/courses/${courseId}?_embed=sessions`,
    null,
    false
  );

  const courseIconInfos = [
    {
      id: 1,
      text: course?.isSupport ? "پشتیبانی دائمی" : "پشتیبانی ندارد",
      icon: "/svg/courseSupport.svg",
    },
    {
      id: 2,
      text: PriceToPersian(course?.duration),
      icon: "/svg/courseDuration.svg",
      title: "ساعت",
    },
    {
      id: 3,
      text: PriceToPersian(course?.sessions.length),
      icon: "/svg/courseSessions.svg",
      title: "جلسه",
    },
    {
      id: 4,
      text: PriceToPersian(course?.studentsCount),
      icon: "/svg/studentCat.svg",
      title: "دانشجو",
    },
  ];

  const [showToast, setShowToast] = useState({});
  const [showContinue, setShowContinue] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    resgisterToastSetter(setShowToast);
  }, []);

  useEffect(() => {
    if (addCartData?.message) {
      showToastHandler(addCartData?.message, "success");
    }

    if (addCartError) {
      if (addCartError?.login == false) {
        showToastHandler("برای ثبت نام وارد شوید", "error").then(() => {
          navigate("/login");
        });
      } else {
        let errorMessage = addCartError.response.data.error;
        showToastHandler(errorMessage, "error");
      }
    }
  }, [addCartData, addCartError]);

  const sessionAccordionHandler = (setIsShow) => {
    setIsShow((prev) => !prev);
  };
  const faqsAccordionHandler = (setIsShow) => {
    setIsShow((prev) => !prev);
  };

  return (
    <>
      <div className="course-wrapper flex flex-col shadow-[var(--cart-shadow)] py-3 px-7 rounded-xl">
        <div className="video-wrapper flex flex-col lg:flex-row ">
          <div className="lg:w-1/2 ml-7 lg:mt-8">
            <div className="course_icon mb-4 w-full">
              {course?.icon ? (
                <img className="w-[80px] h-[80px]" src={course?.icon} alt="" />
              ) : (
                <div className=" animate-pulse md:flex w-[80px]">
                  <div className="flex items-center justify-center !w-[80px] h-[80px] bg-gray-300 rounded-sm sm:w-96">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <p className="course_title">{course?.title}</p>
            <p className="desc text-sm text-[#00000099] mt-5">
              {course?.overview}
            </p>
          </div>

          <div className="video py-1 lg:w-1/2 mt-10 ">
            {course?.image ? (
              <video
                className="rounded-lg object-fill"
                controls
                src="https://example.com/example-video.mp4"
                poster={course?.image}
              ></video>
            ) : (
              <div
                role="status"
                className="flex items-center justify-center h-65 w-full bg-gray-600 rounded-lg animate-pulse"
              >
                <svg
                  className="w-10 h-10 text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>

        <div className="course-infos flex flex-col lg:flex-row lg:items-center lg:justify-between mt-8 lg:mt-12">
          <div className="course-icon-infos lg:order-2 lg:w-1/2 flex justify-around items-center">
            {courseIconInfos.map((course) => (
              <CourseIconInfo key={course.id} {...course} />
            ))}
          </div>

          {isPurchasedCourse(courseId) ? (
            <div className="text-[#2E7D32] lg:mt-0 lg:w-1/2 text-sm mt-8 bg-[#E8F5E9] py-1 px-4 text-center rounded-md">
              شما دانشجوی این دوره هستید.
            </div>
          ) : (
            <div className="course_price flex flex-col md:flex-row md:items-center lg:pl-12 md:justify-between lg:w-1/2 mt-8 md:mt-0">
              <div className="purchase-course md:order-1">
                <div className="prices flex flex-col">
                  {course?.originalPrice && (
                    <p className="originalPrice relative mb-2 before:content-[''] before:w-full before:absolute before:h-[3px] before:rounded-md before:top-0 before:left-0 before:rotate-10 before:origin-left before:bg-red-500 text-sm text-gray-400">
                      {PriceToPersian(course.originalPrice)} تومان
                    </p>
                  )}
                  {course?.price > 0 ? (
                    <p className="text-green-600">
                      {PriceToPersian(course?.price)} تومان
                    </p>
                  ) : (
                    <p>رایگان</p>
                  )}
                </div>
              </div>

              {isInCart(courseId) ? (
                <div className="button-wrapper w-full md:w-auto mt-6 md:mt-0 border border-[var(--dark-purple)] rounded-lg flex py-2 px-4 lg:py-0 justify-center">
                  <Button
                    to="/cart"
                    classes="text-[var(--dark-purple)] text-sm"
                  >
                    ادامه سفارش
                  </Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    viewBox="0 0 20.884 27.105"
                  >
                    <path
                      d="M9.358,6.463a5,5,0,0,1,8.388,0l4.347,6.7A5,5,0,0,1,17.9,20.884H9.205a5,5,0,0,1-4.194-7.722Z"
                      transform="translate(0 27.105) rotate(-90)"
                      fill="var(--dark-purple)"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div className="button-wrapper w-full md:w-auto mt-6 md:mt-0 bg-[var(--dark-purple)] rounded-lg flex py-2 px-4 lg:py-0 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    fill="white"
                    viewBox="0 0 24.661 24.019"
                  >
                    <g transform="translate(0.5 -5.528)">
                      <g transform="translate(0 6.028)">
                        <g transform="translate(0 0)">
                          <path
                            d="M99.122,350.322a2.469,2.469,0,1,0,2.469,2.469A2.469,2.469,0,0,0,99.122,350.322Zm0,3.841a1.372,1.372,0,1,1,1.372-1.372A1.372,1.372,0,0,1,99.122,354.163Z"
                            transform="translate(-91.577 -332.242)"
                            fill="white"
                            stroke="white"
                            strokeWidth="1"
                          ></path>
                          <path
                            d="M297.653,350.322a2.469,2.469,0,1,0,2.469,2.469A2.469,2.469,0,0,0,297.653,350.322Zm0,3.841a1.372,1.372,0,1,1,1.372-1.372A1.372,1.372,0,0,1,297.653,354.163Z"
                            transform="translate(-279.683 -332.242)"
                            fill="white"
                            stroke="white"
                            strokeWidth="1"
                          ></path>
                          <path
                            d="M23.54,9.7a.686.686,0,0,0-.439-.22L5.24,9.238,4.746,7.729a2.524,2.524,0,0,0-2.36-1.7H.549a.549.549,0,1,0,0,1.1H2.387a1.427,1.427,0,0,1,1.317.96L7.188,18.594l-.274.631a2.634,2.634,0,0,0,.247,2.387,2.552,2.552,0,0,0,2.058,1.152H19.891a.549.549,0,1,0,0-1.1H9.219a1.4,1.4,0,0,1-1.152-.658,1.509,1.509,0,0,1-.137-1.317l.22-.494L19.7,17.99a3.018,3.018,0,0,0,2.606-2.3l1.317-5.515A.466.466,0,0,0,23.54,9.7Zm-2.3,5.734a1.866,1.866,0,0,1-1.674,1.454L8.149,18.072,5.6,10.335l16.818.247Z"
                            transform="translate(0 -6.028)"
                            fill="white"
                            stroke="white"
                            strokeWidth="1"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <Button
                    onclick={() => addToCart(courseId, setShowToast)}
                    disabled={isPending}
                    classes="text-white mr-3 text-sm"
                  >
                    {addCartPending ? "در حال ارسال ..." : "ثبت نام در دوره"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        {showToast?.visible && <Toast {...showToast} />}
      </div>

      <div
        className={`tech-overview my-4 flex flex-col relative transition-all duration-300 ${
          showContinue ? "h-auto" : "h-80 lg:h-100 overflow-y-hidden"
        }`}
      >
        {course?.description.map((course) => (
          <WhatIsCard key={course.id} {...course} />
        ))}

        {!showContinue && (
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-27 lg:h-36 bg-white opacity-[0.8] z-0" />
        )}

        <div
          className={`absolute w-full flex justify-center transition-all duration-300 ${
            showContinue ? "-bottom-10 lg:-bottom-16" : "bottom-0"
          } z-10`}
        >
          <Button
            onclick={() => setShowContinue(!showContinue)}
            classes="bg-white rounded-lg py-2 px-5 text-center text-sm shadow-[0px_8px_24px_rgba(149,157,165,0.2)]"
          >
            {showContinue ? "بستن" : "ادامه مطلب"}
          </Button>
        </div>
      </div>

      <div className="sessions flex flex-col mt-20">
        <div className="title flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
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
          <h2 className="text-lg lg:text-2xl mr-2">سرفصل ها</h2>
        </div>
        {course?.sessions.map((session) => (
          <Session
            key={session.id}
            seasion={session.seasion}
            title={session.title}
            order={session.videos.order}
            videos={session.videos}
            onClick={sessionAccordionHandler}
            isPurchasedCourse={isPurchasedCourse}
            courseId={courseId}
            isFree={session.isFree}
          />
        ))}
      </div>

      <div className="faqs flex flex-col mt-30">
        <div className="title flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
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
          <h2 className="text-lg lg:text-2xl mr-2">سوالات متداول</h2>
        </div>
        {faqsData.map((faq) => (
          <Faqs key={faq.id} onClick={faqsAccordionHandler} {...faq} />
        ))}
      </div>
    </>
  );
}
export default memo(Course);
