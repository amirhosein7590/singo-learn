/**
 * Alert/Confirmation dialog management system
 * 
 * Provides a centralized service for displaying confirmation dialogs and alerts
 * with customizable actions, icons, and text labels
 */ 

let setShowAlert = null;    // Reference to the alert setter function from React component

/**
 * Registers the alert setter function from the calling component
 * Establishes the connection between the alert service and React state management
 * 
 * @param {Function} setter - React setState function for alert visibility and configuration
 */

function alertSetter(setter) {
  setShowAlert = setter;
}

/**
 * Displays a customizable confirmation dialog with action handlers
 * Supports custom icons, button texts, and confirmation/cancel callbacks
 * 
 * @param {Object} config - Alert configuration object
 * @param {string} config.title - Main message or question to display in the alert
 * @param {string} [config.icon="warning"] - Icon type ('warning', 'error', 'success', 'info')
 * @param {Function} config.onConfirm - Callback function executed when user confirms
 * @param {string} [config.cancelText="خیر"] - Text for the cancel button (default: "خیر")
 * @param {string} [config.confirmText="بله"] - Text for the confirm button (default: "بله")
 * 
 * @example
 * // Show confirmation dialog
 * showAlertHandler({
 *   title: "آیا از حذف این آیتم مطمئن هستید؟",
 *   icon: "warning",
 *   onConfirm: handleDelete,
 *   cancelText: "لغو",
 *   confirmText: "حذف"
 * });
 * 
 * @note
 * - Automatically handles modal visibility state management
 * - Provides sensible default values for optional parameters
 * - Ensures modal closes before executing confirmation callback
 */

function showAlertHandler({title, icon, onConfirm, cancelText, confirmText}) {
  setShowAlert({
    visible: true,
    onConfirm : ()=>{
      setShowAlert(prev => ({...prev , visible : false}))
      onConfirm();
    },
    cancelText: cancelText || "خیر",
    confirmText: confirmText || "بله",
    title,
    icon: icon || "warning",
    onCancel: () => {
      setShowAlert((prev) => ({ ...prev, visible: false }));
    },
  });
}

export {alertSetter , showAlertHandler}