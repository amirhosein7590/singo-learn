import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { memo, useEffect } from "react";

const iconMap = {
  warning: (
    <img className="w-[80px] h-[80px]" src="../../../public/svg/warning.svg" alt="" />
  ),
  error: <img className="w-[80px] h-[80px]" src="../../../public/svg/error.svg" alt="" />,
  success: <img className="w-[80px] h-[80px]" src="../../../public/svg/success.svg" alt="" />,
};

function Alert({
  onClose,
  icon = "warning", // warning | error | success
  title,
  description,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}) {

  useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return ()=> {
      document.body.style.overflow = 'auto'
    }
  },[])
  return (
    <AnimatePresence>
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-10/12 lg:w-full max-w-md text-center space-y-4"
          >
            <div className="flex justify-center">{iconMap[icon]}</div>
            <p className="lg:text-xl font-semibold text-gray-800">{title}</p>
            {description && <p className="text-gray-500 text-sm">{description}</p>}
            <div className="flex justify-center gap-4 mt-6 items-center">
              {onCancel && (
                <Button
                  onclick={() => {
                    onCancel();
                    onClose();
                  }}
                  classes="!py-[10px] !px-[16.76px] bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button
                  onclick={() => {
                    onConfirm();
                    onClose();
                  }}
                  classes="!py-[10px] !px-[16.76px] bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  {confirmText}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
    </AnimatePresence>
  );
}

export default memo(Alert);
