import { lazy, memo, useEffect, useMemo, useState } from "react";
import EditForm from "../../../components/sections/EditForm";
import useAdminProfle from "../../../hooks/Admin/useAdminProfile";
const Toast = lazy(() => import("../../../components/sections/Toast"));
import {
  resgisterToastSetter,
  showToastHandler,
} from "../../../utils/ToastController";
import useEditAdmin from "../../../hooks/Admin/useEditAdmin";
import { useLocation } from "react-router";
import BASE_ADMIN_PROFILE_INPUT_PATTERNS from "../../../constants/InputPatterns/Admin/AdminProfile";
const Spinner = lazy(() => import("../../../components/sections/Spinner"));

function AdminAccount() {
  const location = useLocation();

  const { profileData, profileError, isProfileLoading } =
    useAdminProfle(location);
  const { updateUser, isUpdating } = useEditAdmin();

  const inputPatterns = useMemo(() => {
    if (!profileData) return BASE_ADMIN_PROFILE_INPUT_PATTERNS;

    return BASE_ADMIN_PROFILE_INPUT_PATTERNS.map((input) => ({
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
        },
        onError: (err) => {
          showToastHandler(err, "error");
        },
      });
    }
  };

  useEffect(() => {
    if (profileError) {
      let error = profileError.response.data.error;
      showToastHandler(error, "error");
    }
  }, [profileError]);

  useEffect(() => {
    resgisterToastSetter(setShowToast);
    document.title = "حساب کاربری";
  }, []);

  return (
    <>
      <div className="edit-form-wrapper mt-8 lg:mt-0">
        {!isProfileLoading ? (
          <EditForm
            inputPatterns={inputPatterns}
            onAction={onUserUpdate}
            title="تغییر حساب کاربری"
            isPending={isUpdating}
          />
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <Spinner size="lg" />
          </div>
        )}
      </div>

      {showToast?.visible && <Toast {...showToast} />}
    </>
  );
}

export default memo(AdminAccount);
