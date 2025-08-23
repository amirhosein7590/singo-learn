/**
 * Toast management utility with Promise-based asynchronous API
 * Provides a wrapper around toast notifications for async/await compatibility
 */

let setShowToast = null; // Reference to the toast setter function from React component

/**
 * Registers the toast setter function from the calling component
 * This function must be called before using showToastHandler
 *
 * @param {Function} setter - React setState function for toast visibility
 */

const resgisterToastSetter = (setter) => {
  setShowToast = setter; // asign original setShowToast
};

/**
 * Displays a toast notification and returns a Promise that resolves when dismissed
 * Enables async/await pattern for toast interactions
 *
 * @param {string} message - The message to display in the toast
 * @param {string} icon - Icon type ('error', 'warning', 'success')
 * @returns {Promise} Resolves when the toast is dismissed by the user
 * @throws {Error} If setShowToast is not registered before calling
 *
 * @example
 * // Usage with async/await:
 * await showToastHandler('Operation successful', 'success');
 * console.log('Toast dismissed, continuing execution...');
 */

const showToastHandler = (message, icon) => {
  return new Promise((resolve) => {
    if (setShowToast) {
      setShowToast({
        // call original setShowToast firstTime to fill showToast
        message, // message that Toast component Show
        icon, // icon that Toast component
        visible: true, // a flag that specifies Toast Component render on not
        onClose: () => {
          // when resolve call
          setShowToast({ visible: false });
          resolve();
        },
      });
    }
  });
};

export { resgisterToastSetter, showToastHandler };
