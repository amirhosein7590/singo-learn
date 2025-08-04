import { lazy, memo, useEffect, useMemo, useState } from "react";
import EditForm from "../../../components/sections/EditForm";
import useAdminProfle from "../../../hooks/Admin/Users/useAdminProfile";
const Toast = lazy(() => import("../../../components/sections/Toast"));
import {
  resgisterToastSetter,
  showToastHandler,
} from "../../../utils/ToastController";
import useEditUser from "../../../hooks/Admin/Users/useEditUser";
import { useLocation } from "react-router";

function AdminAccount() {
  const BASE_INPUT_PATTERNS = [
    {
      name: "username",
      type: "text",
      classes: "mt-1 text-sm",
      label: {
        message: "نام کاربری جدید را وارد کنید",
        classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
      },
      rules: {
        required: "نام کاربری نمیتواند خالی باشد",
        pattern: {
          value: /^.{5,}$/,
          message: "نام کاربری نمیتواند کمتر از 5 کاراکتر باشد",
        },
      },
    },
    {
      name: "fullname",
      type: "text",
      classes: "mt-1 text-sm",
      label: {
        message: "نام و نام خانوادگی جدید را وارد کنید",
        classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
      },
      rules: {
        required: "نام و نام خانوادگی نمیتواند خالی باشد",
        pattern: {
          value: /^[\u0600-\u06FF\s]{5,}$/,
          message:
            "نام و نام خانوادگی نمیتواند کمتر از 5 کاراکتر و حروف انگلیسی باشد",
        },
      },
    },
    {
      name: "email",
      type: "email",
      classes: "mt-1 text-sm",
      label: {
        message: "ایمیل جدید را وارد کنید",
        classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
      },
      rules: {
        required: "ایمیل نمی تواند خالی باشد",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "ایمیل وارد شده معتبر نمی باشد",
        },
      },
    },
    {
      name: "phonenumber",
      type: "text",
      classes: "mt-1 text-sm",
      label: {
        message: "شماره موبایل جدید را وارد کنید",
        classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
      },
      rules: {
        required: "شماره موبایل نمی تواند خالی باشد",
        pattern: {
          value: /^09[0-9]{9}$/,
          message: "شماره موبایل وارد شده معتبر نمی باشد",
        },
      },
    },
  ];
  const location = useLocation();

  const { profileData, profileError, isProfileLoading } = useAdminProfle(location);
  const { updateUser, isUpdating } = useEditUser();

  const inputPatterns = useMemo(() => {
    if (!profileData) return BASE_INPUT_PATTERNS;

    return BASE_INPUT_PATTERNS.map((input) => ({
      ...input,
      defaultValue: profileData[input.name] || "",
    }));
  }, [profileData]);

  const [showToast, setShowToast] = useState({});

  const onUserUpdate = (inputDatas) => {
    if (profileData) {
      let { username, email, fullname, phonenumber, ...other } = profileData;
      let bodyRequest = { ...other, ...inputDatas };
      updateUser(bodyRequest, {
        onSuccess: (res) => {
          showToastHandler("تغییرات با موفقیت انجام شد", "success");
          console.log(res);
        },
        onError: (err) => {
          showToastHandler(err, "error");
        },
      });
    }
  };

  useEffect(() => {
    resgisterToastSetter(setShowToast);
    if (profileError) {
      let error = profileError.response.data.error;
      showToastHandler(error, "error");
    }
  }, [profileError]);

  return (
    <>
      <div className="edit-form-wrapper mt-8 lg:mt-0">
        {!isProfileLoading && (
          <EditForm
            inputPatterns={inputPatterns}
            onAction={onUserUpdate}
            title="تغییر حساب کاربری"
            isPending={isUpdating}
          />
        )}
      </div>

      {showToast?.visible && <Toast {...showToast} />}
    </>
  );
}

export default memo(AdminAccount);
