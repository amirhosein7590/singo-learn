import { lazy, useEffect, useState } from "react";
import useCart from "../hooks/useCart";
import CartItem from "../components/sections/CartItem";
import PriceToPersian from "../utils/PriceToPersian";
import Button from "../components/ui/Button";
import {
  resgisterToastSetter,
  showToastHandler,
} from "../utils/ToastController";
import { useNavigate } from "react-router";
const Toast = lazy(() => import("../components/sections/Toast"));

function Cart() {
  const role = JSON.parse(localStorage.getItem("userInfos"))?.role;
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "سبد خرید";
    resgisterToastSetter(setShowToast);
    if (role == "teacher") {
      navigate("/dashboard/teacher");
    }
  }, []);

  const {
    totalPrices,
    allCoursesInCart,
    purchase,
    purchaseError,
    purchasePending,
    purchaseData,
  } = useCart();

  const [showToast, setShowToast] = useState({});

  const purchaseCourse = () => {
    if (allCoursesInCart?.cart) {
      let coursesIds = allCoursesInCart?.cart.map((course) => course.id);
      purchase(coursesIds);
    }
  };

  useEffect(() => {
    if (purchaseData?.success) {
      showToastHandler(purchaseData.message, "success");
    }
    if (purchaseError) {
      let error = purchaseError.response.data.error;
      showToastHandler(error, "error");
    }
  }, [purchaseData, , purchaseError]);

  return (
    <>
      {allCoursesInCart?.cart.length > 0 ? (
        <>
          <div className="wrapper flex flex-col lg:flex-row lg:justify-between gap-4">
            <div className="courses-list lg:w-8/12">
              <div className="title flex mb-5">
               <img src="/svg/decoration.svg" alt="" />
                <h2 className="text-xl mr-3">لیست دوره ها</h2>
              </div>
              <div className="courses flex flex-col py-3">
                {allCoursesInCart?.cart.map((course) => (
                  <CartItem
                    key={course.id}
                    {...course}
                    courseIcon={course.icon}
                    price={PriceToPersian(course.price)}
                    originalPrice={course?.originalPrice && PriceToPersian(course.originalPrice)}
                    {...showToast}
                  />
                ))}
              </div>
            </div>

            <div className="courses-prices lg:w-4/12 mt-6 lg:mt-0 flex flex-col">
              <div className="title flex items-center mb-4">
                <img src="/svg/decoration.svg" alt="" />
                <h2 className="text-xl mr-2">هزینه دوره ها</h2>
              </div>

              <div className="flex flex-col p-6 rounded-md shadow-[var(--cart-shadow)]">
                <div className="totalPrices mb-12 flex justify-between pb-3 items-center border-b border-b-[#0000001f]">
                  <p>جمع کل</p>
                  <p className="text-[#00000099]">
                    {PriceToPersian(totalPrices())} تومان
                  </p>
                </div>
                

                <div className="price-for-pay flex justify-between items-center">
                  <p>قابل پرداخت:</p>
                  <p className="text-green-600">
                    {PriceToPersian(totalPrices())} تومان
                  </p>
                </div>
                <Button
                  onclick={purchaseCourse}
                  disabled={purchasePending}
                  classes="text-white py-2 px-4 bg-[var(--dark-purple)] mt-8 rounded-lg"
                >
                  {purchasePending ? "در حال ارسال .." : "تکمیل سفارش"}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-basket flex flex-col items-center my-12">
          <p className="text-center text-lg mb-7">
            متاسفانه سبد خرید شما خالی است
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
      {showToast?.visible && <Toast {...showToast} />}
    </>
  );
}
export default Cart;
