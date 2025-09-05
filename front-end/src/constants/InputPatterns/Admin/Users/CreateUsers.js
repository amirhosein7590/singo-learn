/**
 * Input configuration patterns for creating a new user
 * 
 * Defines the structure and validation rules for user creation form
 * Used by EditForm component to generate the form dynamically
 * Includes username, password, fullname, email, and phone number fields
 * 
 * @constant {Array<Object>} BASE_CREATE_USER_INPUT_PATTERNS - Array of input field configurations
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('text', 'password', 'email')
 * @property {string} classes - CSS classes for styling the input element
 * @property {string} placeholder - Example placeholder text (optional)
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form validation schema
 * @property {string} rules.required - Required field validation message
 * @property {Object} rules.pattern - Regex pattern validation
 * @property {RegExp} rules.pattern.value - Regex pattern for input
 * @property {string} rules.pattern.message - Error message for invalid input
 * @property {Object} toggleVisibleButton - (For password input) configuration for show/hide password button
 * 
 * @example
 * // Typical usage in EditForm:
 * <EditForm
 *   title="ایجاد کاربر"
 *   inputPatterns={BASE_CREATE_USER_INPUT_PATTERNS}
 *   onAction={handleSubmitUser}
 * />
 * 
 * @note
 * - Username requires minimum 5 characters
 * - Password must include at least one uppercase, lowercase, number, and symbol
 * - Fullname requires minimum 5 Persian characters (English letters not allowed)
 * - Email must be valid according to regex
 * - Phone number must be valid Iranian mobile number format (09xxxxxxxxx)
 */


const BASE_CREATE_USER_INPUT_PATTERNS = [
  {
    name: "username",
    type: "text",
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
    name: "password",
    type: "password",
    classes: "mt-1 text-sm",
    label: {
      message: "رمز عبور را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    toggleVisibleButton: {
      classes: "top-[33%]",
    },
    rules: {
      required: "رمز عبور نمی تواند خالی باشد",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        message:
          "رمز عبور باید حداقل یک حرف بزرگ و کوچک ، یک سمبل و عدد داشته باشد",
      },
    },
  },
  {
    name: "fullname",
    type: "text",
    classes: "mt-1 text-sm",
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
  }
];

export default BASE_CREATE_USER_INPUT_PATTERNS;
