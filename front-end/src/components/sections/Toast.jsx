/**
 * Toast Component
 * Temporary notification displayed at the top of the screen.
 *
 * @param {string} message - The notification text to display.
 * @param {string} icon - Icon name (SVG path is resolved using this).
 * @param {Function} onClose - Callback triggered after timeout or when closing manually.
 *
 * @returns {JSX.Element} Animated toast with icon and message.
 *
 * @description
 * - Auto-dismisses after 3 seconds using `setTimeout`.
 * - Uses `framer-motion` for enter/exit animations (slide & scale).
 * - Displays an icon alongside the message.
 * - Positioned fixed at the top-center of the viewport.
 */


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
  }, [message]);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -30, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="toast flex z-100 items-center fixed bg-white py-2 px-3 text-sm lg:text-[16px] lg:py-2 lg:px-6 rounded-lg shadow-xs left-1/2 -translate-x-1/2 top-2/12"
    >
      <img src={`/svg/${icon}.svg`} alt="" />
      <p className="toast-title mr-1 text-[#363636]">{message}</p>
    </motion.div>
  );
}

export default Toast;
