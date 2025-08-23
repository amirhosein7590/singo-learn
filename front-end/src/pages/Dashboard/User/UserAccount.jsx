import { memo, useEffect } from "react";
import { useOutletContext } from "react-router";
import Button from "../../../components/ui/Button";

function UserAccount() {
  const context = useOutletContext();
  useEffect(() => {
    document.title = "حساب کاربری";
  }, []);
  return (
    <div className="flex flex-col rounded-lg py-7 px-6 shadow-[var(--cart-shadow)] mt-12 lg:mt-0 bg-white ">
      {context ? (
        <h4 className="text-2xl mb-7">سلام {context} عزیز ❤️</h4>
      ) : (
        <div role="status" class="max-w-sm animate-pulse">
          <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        </div>
      )}
      <p>میخوای برنامه نویس شی؟ جای درستی اومدی 👌</p>
      <p className="py-2.5 px-2 rounded-md bg-[#f3e5f5] text-[#4a148c] mt-5 leading-7">
        در قسمت{" "}
        <Button
          to="/dashboard/user/courses"
          classes="border border-[#4a148c] mx-1 rounded-md !py-0 !px-2"
        >
          {" "}
          دوره های من
        </Button>{" "}
        میتوانید تمامی دوره هایی که شرکت کردید و نحوه دسترسی به آنها را ببینید
      </p>
    </div>
  );
}

export default memo(UserAccount);
