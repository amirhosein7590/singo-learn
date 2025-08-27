/**
 * Teacher Account Page
 * ----------------------------------------
 * This component allows a teacher to view and edit their own profile.
 * It does not include any access control since teachers can only manage their own data.
 *
 * @component
 * @returns {JSX.Element} Form to edit teacher profile with toast notifications.
 *
 * @description
 * - Fetches teacher profile using `useGetProfile` hook.
 * - Uses `useMemo` to prepare input patterns dynamically based on fetched profile data.
 *   - If data is not yet loaded, defaults to `BASE_TEACHER_PROFILE_INPUT_PATTERNS`.
 *   - Sets `defaultValue` for each input based on fetched profile data.
 * - Uses `EditForm` to render the form and handle updates.
 * - Uses `useEditProfile` hook to manage profile update API calls.
 * - Shows a `Spinner` while profile data is loading.
 * - Uses lazy-loaded `Toast` for notifications and `resgisterToastSetter` to manage toast state.
 * - Uses `memo` to avoid unnecessary re-renders if props/state remain unchanged.
 * - Sets document title to "حساب کاربری" on mount.
 */


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
const Spinner = lazy(()=> import('../../../components/sections/Spinner'))

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
    document.title = 'حساب کاربری'
  }, []);
  return (
    <>
      <div className="edit-form-wrapper mt-8 lg:mt-0">
        {!isProfileLoading ? (
          <EditForm
            inputPatterns={inputPatterns}
            onAction={updateUser}
            title="تغییر حساب کاربری"
            isPending={isUpdating}
          />
        ) : <div className="flex justify-center items-center">
          <Spinner size="lg" />
          </div>}
      </div>
      {showToast?.visible && <Toast {...showToast} />}
    </>
  );
}

export default memo(Account);
