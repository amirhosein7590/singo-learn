/**
 * Input configuration patterns for editing an existing user
 * 
 * Transforms base input patterns by injecting existing user data into appropriate fields
 * Used by EditForm component for pre-populating form fields in edit mode
 * Includes username, fullname, email, and phone number fields
 * 
 * @constant {Array<Object>} BASE_EDIT_USER_INPUT_PATTERN - Array of input field configurations for editing
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('text', 'email')
 * @property {string} defaultValue - Initial value populated from server data
 * @property {string} classes - CSS classes for styling the input element
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form validation schema
 * @property {string} rules.required - Required field validation message
 * @property {Object} rules.pattern - Regex pattern validation
 * @property {RegExp} rules.pattern.value - Regex pattern for input
 * @property {string} rules.pattern.message - Error message for invalid input
 * 
 * @example
 * // Typical usage in EditForm:
 * <EditForm
 *   title="ویرایش کاربر"
 *   inputPatterns={BASE_EDIT_USER_INPUT_PATTERN}
 *   onAction={handleUpdateUser}
 * />
 * 
 * @note
 * - All text fields are pre-populated with server data via defaultValue
 * - Validation rules are the same as in creation form
 * - No password field included by default; can be added separately if needed
 */


const BASE_EDIT_USER_INPUT_PATTERN = [
  {
    name: "username",
    type: "text",
    defaultValue : '',
    classes: "mt-1 text-sm",
    label: {
      message: "نام کاربری را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "نام کاربری نمیتواند خالی باشد",
      pattern: {
        value: /^.{3,}$/,
        message: "نام کاربری کوتاه است",
      },
    },
  },
  {
    name: "fullname",
    type: "text",
    classes: "mt-1 text-sm",
    defaultValue : '',
    label: {
      message: "نام و نام خانوادگی را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "نام و نام خانوادگی نمیتواند خالی باشد",
      pattern: {
        value: /^[\u0600-\u06FF\s]{5,}$/,
        message:
          "نام و نام خانوادگی نمیتواند کمتر از 5 کاراکتر و حروف انگلیسی باشد",
      },
    },
  },
  {
    name: "email",
    defaultValue:'',
    type: "email",
    classes: "mt-1 text-sm",
    label: {
      message: "ایمیل را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "ایمیل نمی تواند خالی باشد",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "ایمیل وارد شده معتبر نمی باشد",
      },
    },
  },
  {
    name: "phonenumber",
    type: "text",
    defaultValue:'',
    classes: "mt-1 text-sm",
    label: {
      message: "شماره موبایل را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "شماره موبایل نمی تواند خالی باشد",
      pattern: {
        value: /^09[۰-۹0-9]{9}$/,
        message: "شماره موبایل وارد شده معتبر نمی باشد",
      },
    },
  },

]

export default BASE_EDIT_USER_INPUT_PATTERN