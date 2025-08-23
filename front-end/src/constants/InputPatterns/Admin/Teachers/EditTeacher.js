/**
 * Input configuration patterns for teacher account editing form
 * 
 * Simplified version for teacher profile editing - excludes password field for security
 * Pre-populated with existing teacher data for seamless editing experience
 * Maintains same validation rules as creation form for consistency
 * 
 * @constant {Array<Object>} BASE_EDIT_TEACHER_INPUT_PATTERN - Teacher editing form configuration
 * @property {string} defaultValue - Pre-filled values from existing teacher profile
 * 
 * @note
 * - Password field intentionally omitted for security reasons
 * - Default values populated from existing teacher data
 * - Maintains all validation rules except password
 * - Course selection reflects current teacher assignments
 */

const BASE_EDIT_TEACHER_INPUT_PATTERN = [
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
        value: /^.{5,}$/,
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
        value: /^09[0-9]{9}$/,
        message: "شماره موبایل وارد شده معتبر نمی باشد",
      },
    },
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

]

export default BASE_EDIT_TEACHER_INPUT_PATTERN