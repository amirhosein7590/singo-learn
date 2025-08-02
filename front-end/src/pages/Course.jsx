import { useNavigate, useParams } from "react-router";
import useCart from "../hooks/useCart";
import useAxiosQuery from "../hooks/useAxiosQuery";
import CourseIconInfo from "../components/sections/CourseIconInfo";
import PriceToPersian from "../utils/PriceToPersian";
import Button from "../components/ui/Button";
import { memo, useEffect, useState } from "react";
import {
  resgisterToastSetter,
  showToastHandler,
} from "../utils/ToastController";
import Toast from "../components/sections/Toast";
import Editor from "../components/sections/Editor";

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
    null,
    `/courses/${courseId}?_embed=sessions`,
    null,
    false
  );

  const courseIconInfos = [
    {
      id: 1,
      text: course?.isSupport ? "پشتیبانی دائمی" : "پشتیبانی ندارد",
      icon: "../../public/images/courseSupport.svg",
    },
    {
      id: 2,
      text: PriceToPersian(course?.duration),
      icon: "../../public/images/courseDuration.svg",
      title: "ساعت",
    },
    {
      id: 3,
      text: PriceToPersian(course?.sessions.length),
      icon: "../../public/images/courseSessions.svg",
      title: "جلسه",
    },
    {
      id: 4,
      text: PriceToPersian(course?.studentsCount),
      icon: "../../public/images/studentCat.svg",
      title: "دانشجو",
    },
  ];

  const [showToast, setShowToast] = useState({});
  const navigate = useNavigate();

  resgisterToastSetter(setShowToast);

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

  return (
    <>
      <div className="course-wrapper flex flex-col shadow-[var(--cart-shadow)] py-3 px-7 rounded-xl">
        <div className="video-wrapper flex flex-col lg:flex-row ">
          <div className="lg:w-1/2 ml-7 lg:mt-8">
            <div className="course_icon mb-4 w-full">
              <img className="w-[80px] h-[80px]" src={course?.icon} alt="" />
            </div>
            <p className="course_title">{course?.title}</p>
            <p className="desc text-sm text-[#00000099] mt-5">
              {course?.description}
            </p>
          </div>

          <div className="video py-1 lg:w-1/2 mt-10 ">
            <video
              className="rounded-lg"
              controls
              src="https://example.com/example-video.mp4"
              poster={course?.image}
            ></video>
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
                  {course?.price > 0 ? <p className="text-green-600">
                    {PriceToPersian(course?.price)} تومان
                  </p> : <p>رایگان</p>}

                  {/* off price will complete later */}
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
                    onclick={() => addToCart(courseId)}
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
    </>
  );
}
export default memo(Course);
