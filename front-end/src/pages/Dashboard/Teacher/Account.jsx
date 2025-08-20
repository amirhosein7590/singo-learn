import { lazy, useState , useMemo } from "react";
import BASE_TEACHER_PROFILE_INPUT_PATTERNS from "../../../constants/InputPatterns/Teacher/TeacherProfile";
import {
  resgisterToastSetter,
} from "../../../utils/ToastController";
const Toast = lazy(() => import("../../../components/sections/Toast"));
import { memo } from "react";
import { useEffect } from "react";
import useGetProfile from "../../../hooks/Teacher/useGetProfile";
import EditForm from "../../../components/sections/EditForm";
import useEditProfile from '../../../hooks/Teacher/useEditProfile'

function Account() {
  const [showToast, setShowToast] = useState({});

  const { data, isProfileLoading } = useGetProfile();
  const {isUpdating , updateUser} = useEditProfile()

  const inputPatterns = useMemo(() => {
    if (!data) return BASE_TEACHER_PROFILE_INPUT_PATTERNS;

    return BASE_TEACHER_PROFILE_INPUT_PATTERNS.map((input) => ({
      ...input,
      defaultValue: data[input.name] || "",
    }));
  }, [data]);

  useEffect(() => {
    resgisterToastSetter(setShowToast);
  }, []);
  return (
    <>
      <div className="edit-form-wrapper mt-8 lg:mt-0">
        {!isProfileLoading && (
          <EditForm
            inputPatterns={inputPatterns}
            onAction={updateUser}
            title="تغییر حساب کاربری"
            isPending={isUpdating}
          />
        )}
      </div>
      {showToast?.visible && <Toast {...showToast} />}
    </>
  );
}

export default memo(Account);
