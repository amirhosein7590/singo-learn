import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { memo, useEffect } from "react";

const iconMap = {
  warning: (
    <img
      className="w-[80px] h-[80px]"
      src="/svg/warning.svg"
      alt=""
    />
  ),
  error: (
    <img
      className="w-[80px] h-[80px]"
      src="/svg/error.svg"
      alt=""
    />
  ),
  success: (
    <img
      className="w-[80px] h-[80px]"
      src="/svg/success.svg"
      alt=""
    />
  ),
};

function Alert({
  icon = "warning", // warning | error | success
  title,
  description,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
      <AnimatePresence>
           <motion.div
          id="popup-modal"
          tabIndex={-1}
          className="fixed inset-0 z-100 flex justify-center items-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative p-4 w-full max-w-md"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <motion.div 
              className="relative bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-4 md:p-5 text-center">
                <motion.div
                  className="icon-wrapper flex justify-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  {iconMap[icon]}
                </motion.div>

                <motion.h3 
                  className="mb-5 text-lg font-normal text-gray-500"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {title}
                </motion.h3>

                <div className="flex justify-center gap-3">
                  <Button
                    type="button"
                    onclick={onConfirm}
                    classes="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    {confirmText}
                  </Button>
                  <Button
                    type="button"
                    onclick={() => {
                      onCancel();
                    }}
                    classes="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  >
                    {cancelText}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
  );
}

export default memo(Alert);
