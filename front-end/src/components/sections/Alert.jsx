import { motion, AnimatePresence } from "framer-motion";

// آیکن‌های ساده SVG بر اساس نوع هشدار
const iconMap = {
  warning: (
    <svg className="w-10 h-10 text-yellow-500" viewBox="0 0 24 24" fill="none">
      <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  error: (
    <svg className="w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none">
      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 
      10-10S17.52 2 12 2zm5 13.59L15.59 
      17 12 13.41 8.41 17 7 15.59 10.59 12 
      7 8.41 8.41 7 12 10.59 15.59 7 
      17 8.41 13.41 12 17 15.59z"/>
    </svg>
  ),
  success: (
    <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none">
      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 
      12s4.48 10 10 10 10-4.48 10-10S17.52 2 
      12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 
      8l-9 9z"/>
    </svg>
  ),
};

export default function CustomAlert({
  isOpen,
  onClose,
  icon = "warning", // warning | error | success
  title = "عنوان هشدار",
  description = "توضیح مورد نظر",
  onConfirm,
  onCancel,
  confirmText = "تأیید",
  cancelText = "لغو",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center space-y-4"
          >
            <div className="flex justify-center">{iconMap[icon]}</div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-500 text-sm">{description}</p>
            <div className="flex justify-center gap-4 mt-6">
              {onCancel && (
                <button
                  onClick={() => {
                    onCancel();
                    onClose();
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                >
                  {cancelText}
                </button>
              )}
              {onConfirm && (
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  {confirmText}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
