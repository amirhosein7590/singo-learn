/**
 * Input configuration patterns for editing the logged-in admin's profile
 * 
 * Defines the structure and validation rules for updating admin profile information
 * Used by EditForm component to dynamically generate the form fields
 * Includes username, fullname, email, and phone number fields
 * 
 * @constant {Array<Object>} BASE_ADMIN_PROFILE_INPUT_PATTERNS
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('text', 'email')
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
 * <EditForm
 *   title="ویرایش پروفایل ادمین"
 *   inputPatterns={BASE_ADMIN_PROFILE_INPUT_PATTERNS}
 *   onAction={handleUpdateProfile}
 * />
 * 
 * @note
 * - All fields are editable by the admin for updating their own profile
 * - Username requires minimum 5 characters
 * - Fullname requires minimum 5 Persian characters (English letters not allowed)
 * - Email must be valid according to regex
 * - Phone number must be valid Iranian mobile number format (09xxxxxxxxx)
 */


const BASE_TEACHER_PROFILE_INPUT_PATTERNS = [
    {
      name: "username",
      type: "text",
      classes: "mt-1 text-sm",
      label: {
        message: "نام کاربری جدید را وارد کنید",
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
      label: {
        message: "نام و نام خانوادگی جدید را وارد کنید",
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
        message: "ایمیل جدید را وارد کنید",
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
        message: "شماره موبایل جدید را وارد کنید",
        classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
      },
      rules: {
        required: "شماره موبایل نمی تواند خالی باشد",
        pattern: {
          value: /^[0۰٠][9۹٩][0-9۰-۹٠-٩]{9}$/u
,
          message: "شماره موبایل وارد شده معتبر نمی باشد",
        },
      },
    },
  ];

  export default BASE_TEACHER_PROFILE_INPUT_PATTERNS