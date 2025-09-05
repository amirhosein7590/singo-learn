/**
 * CartItem Component
 * Displays a single course item inside the shopping cart with its details and remove option.
 *
 * @component
 *
 * @param {string} courseIcon - Course thumbnail/icon image URL.
 * @param {string} title - Course title.
 * @param {string|number} price - Final price (formatted).
 * @param {string|number} [originalPrice] - Original price before discount (optional).
 * @param {string|number} id - Unique course ID.
 * @param {Object} showToast - Toast configuration (visibility, message, icon).
 *
 * @returns {JSX.Element} A styled cart item with course details and remove button.
 *
 * @description
 * - Fetches cart-related actions from `useCart` hook.
 * - Allows removing a course from the cart:
 *   - Shows success toast if removed successfully.
 *   - Shows error toast if removal fails.
 * - Displays both original (strikethrough) and final price.
 * - Shows loading state on remove button (`در حال ارسال ...`).
 * - Optionally renders `Toast` if `showToast.visible` is true.
 */

import Button from "../ui/Button";
import { lazy, memo, useEffect } from "react";
import useCart from "../../hooks/useCart";
import { showToastHandler } from "../../utils/ToastController";
const Toast = lazy(() => import("../sections/Toast"));

function CartItem({ courseIcon, title, price, id, showToast, originalPrice }) {
  const {
    removeFormCart,
    removeCoursePending,
    removeCourseError,
    removeFromCartData,
  } = useCart();

  useEffect(() => {
    if (removeFromCartData?.success) {
      showToastHandler(removeFromCartData.message, "success");
    }
    if (removeCourseError) {
      let error = removeCourseError.response.data.error;
      showToastHandler(error, "error");
    }
  }, [removeFromCartData, removeCourseError]);

  const iconLoadingError = (event) => {
    event.target.src = "/svg/course-icon-fallback.svg";
  };

  return (
    <div className="cart flex flex-col lg:flex-row p-4 shadow-[var(--cart-shadow)] my-4 rounded-xl w-full">
      <div className="cart__icon w-full lg:w-2/12 flex items-center">
        <img
          className="w-[80px] h-[80px]"
          src={courseIcon}
          onError={(event) => iconLoadingError(event)}
          alt=""
        />
      </div>

      <div className="cart-detail w-full lg:w-10/12">
        <div className="cart_title mt-5">
          <p>{title}</p>
        </div>

        <div className="cart_price flex justify-between mt-5 lg:mt-1 items-center">
          <div className="price flex flex-col">
            {originalPrice && (
              <p className="originalPrice relative my-2 before:content-[''] before:w-full before:absolute before:h-[3px] before:rounded-md before:top-0 before:left-0 before:rotate-10 before:origin-left before:bg-red-500 text-sm text-gray-400">
                {originalPrice} تومان
              </p>
            )}
            <p className="text-[#00000099] text-sm">{price} تومان</p>
          </div>
          <Button
            disabled={removeCoursePending}
            onclick={() => removeFormCart(id)}
            classes="border border-[#dc2626] py-1 px-4 rounded-lg"
          >
            {removeCoursePending ? (
              "در حال ارسال ..."
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#dc2626"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"></path>
                <path d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"></path>
              </svg>
            )}
          </Button>
        </div>
      </div>
      {showToast?.visible && <Toast {...showToast} />}
    </div>
  );
}

export default memo(CartItem);
