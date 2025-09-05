/**
 * Input configuration patterns for teacher account creation form
 * 
 * Defines comprehensive form structure and validation rules for creating new teacher accounts
 * Includes fields for authentication, personal information, contact details, and professional specialization
 * Features strong password validation and Persian name pattern matching
 * 
 * @constant {Array<Object>} BASE_CREATE_TEACHER_INPUT_PATTERNS - Teacher creation form configuration
 * @property {Object} password - Strong password validation with complexity requirements
 * @property {Object} fullname - Persian name validation with minimum length requirement
 * @property {Object} phonenumber - Iranian mobile number validation (09XXXXXXXXX format)
 * @property {Object} stack - Professional specialization dropdown with predefined options
 * @property {Object} courseIds - Multiple course selection for teacher assignment
 * 
 * @note
 * - Password requires: uppercase, lowercase, number, symbol, and minimum 8 characters
 * - Fullname validation uses Persian Unicode range (\\u0600-\\u06FF) and minimum 5 characters
 * - Phone number follows Iranian format (09 followed by 9 digits)
 * - Stack options cover common development specializations in Persian
 * - Course selection supports multiple assignments for teachers
 */

const BASE_CREATE_TEACHER_INPUT_PATTERNS = [
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
  },
  {
    name: "stack",
    type: "select",
    rules: {
      required: "عنوان تخصص خالی است",
    },
    options: [
      { label: "فرانت اند", value: "فرانت اند" },
      { label: "بک اند", value: "بک اند" },
      { label: "دیتا ساینس", value: "دیتا ساینس" },
      { label: "دواپس", value: "دواپس" },
      { label: "موبایل دولوپر", value: "موبایل دولوپر" },
    ],
    multiple: false,
    placeholder: "عنوان تخصص",
  },

  {
    name: "courseIds",
    type: "select",
    rules: {
      required: "دوره انتخاب نشده است",
    },
    options: [],
    multiple: true,
    placeholder: "انتخاب دوره",
  },
];

export default BASE_CREATE_TEACHER_INPUT_PATTERNS;
