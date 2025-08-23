/**
 * Modal management utility for centralized modal state control
 * Provides a Promise-like interface for modal operations with consistent API
 */

let setShowModal = null; // Reference to the modal setter function from React component

/**
 * Registers the modal setter function from the calling component
 * Must be called before using showModalHandler to establish the state connection
 * 
 * @param {Function} setter - React setState function for modal visibility and configuration
 */

function modalSetter(setter) {
  setShowModal = setter;
}

/**
 * Displays a modal with specified configuration and handles action/cancel operations
 * Supports both edit and create modes with customizable form patterns and actions
 * 
 * @param {Object} config - Modal configuration object
 * @param {boolean} config.isEdit - Determines if modal is in edit mode (true) or create mode (false)
 * @param {Array} config.inputPatterns - Form field configurations and validation patterns
 * @param {boolean} config.isPending - Loading state indicator for async operations
 * @param {Function} config.onAction - Callback function for primary modal action (save/edit)
 * @param {string} config.title - Modal title text
 * @param {Object} config.tableData - Data object for pre-populating form fields in edit mode
 * @param {Function} [config.onClose] - Optional custom callback for modal close events
 * 
 * @example
 * // Show create modal
 * showModalHandler({
 *   isEdit: false,
 *   inputPatterns: formConfig,
 *   title: 'Create New Item',
 *   onAction: handleCreate,
 *   tableData: null
 * });
 */

function showModalHandler({
  isEdit,
  inputPatterns,
  isPending,
  onAction,
  title,
  tableData,
  onClose,
}) {
  const onCloseHandler = onClose
    ? () => {
        onClose();
        setShowModal((prev) => ({ ...prev, visible: false }));
      }
    : () => {
        setShowModal((prev) => ({ ...prev, visible: false }));
      };

  setShowModal({
    visible: true,
    inputPatterns,
    isEdit,
    isPending,
    onAction,
    title,
    tableData,
    onClose: onCloseHandler,
  });
}

export { modalSetter, showModalHandler };
