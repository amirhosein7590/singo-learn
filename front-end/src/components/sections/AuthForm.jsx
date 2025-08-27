/**
 * AuthForm Component
 * Layout wrapper for authentication-related pages (Login, Register, ForgotPassword).
 *
 * @param {ReactNode} children - The form or content to be rendered inside.
 *
 * @returns {JSX.Element} Auth form container with logo and optional toast notifications.
 *
 * @description
 * - Displays the app logo at the top.
 * - Renders any child component (usually a form).
 * - Integrates with `ToastController` to show toast messages globally.
 * - Uses `lazy` loading for the `Toast` component.
 * - Locks toast state via `registerToastSetter` utility.
 */


import { lazy, memo, useEffect, useState } from "react";
const Toast = lazy(()=> import("../sections/Toast"))
import {resgisterToastSetter} from '../../utils/ToastController'
function AuthForm({ children }) {
  const [showToast, setShowToast] = useState({});
  useEffect(()=>{
    resgisterToastSetter(setShowToast)
  },[])

  return (
    <main className="flex flex-col my-20 w-full md:w-8/12 lg:w-6/12 mx-auto">
      <div className="icon_wrapper flex justify-center mb-10">
        <img className="w-4/12" src="/images/logo.png" alt="" />
      </div>
      {children}
      {showToast.visible && <Toast {...showToast} onClose={showToast?.onClose} />}
    </main>
  );
}

export default memo(AuthForm);
