import { memo, useState } from "react";
import Toast from "./Toast";
function AuthForm({ children }) {
  const [showToast, setShowToast] = useState(null);

  return (
    <main className="flex flex-col my-20 w-full md:w-8/12 lg:w-6/12 mx-auto">
      <div className="icon_wrapper flex justify-center mb-10">
        <img className="w-4/12" src="../../../public/images/logo.jpg" alt="" />
      </div>
      {typeof children == "function" ? children({ setShowToast }) : children}
      {showToast && <Toast {...showToast} setShowToast={setShowToast} />}
    </main>
  );
}

export default memo(AuthForm);
