import { useEffect } from "react";
import { motion } from "framer-motion";

function Toast({ message, icon, onClose }) {
  useEffect(() => {
    const timeId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [icon]);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -30, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="toast flex z-100 items-center fixed bg-white py-2 px-3 text-sm lg:text-[16px] lg:py-2 lg:px-6 rounded-lg shadow-xs left-1/2 -translate-x-1/2 top-2/12"
    >
      <img src={`../../public/svg/${icon}.svg`} alt="" />
      <p className="toast-title mr-1 text-[#363636]">{message}</p>
    </motion.div>
  );
}

export default Toast;
