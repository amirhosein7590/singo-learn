import { memo, useState } from "react";
import Toast from "./Toast";
import {resgisterToastSetter , showToastHandler} from '../../utils/ToastController'
function AuthForm({ children }) {
  const [showToast, setShowToast] = useState({});
  resgisterToastSetter(setShowToast)

  return (
    <main className="flex flex-col my-20 w-full md:w-8/12 lg:w-6/12 mx-auto">
      <div className="icon_wrapper flex justify-center mb-10">
        <img className="w-4/12" src="../../../public/images/logo.jpg" alt="" />
      </div>
      {children}
      {showToast.visible && <Toast {...showToast} onClose={showToast?.onClose} />}
    </main>
  );
}

export default memo(AuthForm);
