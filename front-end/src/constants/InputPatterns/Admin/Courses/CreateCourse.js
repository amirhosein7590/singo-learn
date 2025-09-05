/**
 * Input configuration patterns for course creation/editing form
 * 
 * Defines the form structure, validation rules, and UI configuration for course management forms
 * Used by EditForm component to dynamically generate form fields with validation
 * 
 * @constant {Array<Object>} BASE_CREATE_COURSE_INPUT_PATTERNS - Array of input field configurations
 * @property {string} name - Unique identifier for the form field (matches backend field names)
 * @property {string} type - Input type ('text', 'number', 'file', 'select', 'editor')
 * @property {string} classes - CSS classes for styling the input element
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {string} [id] - HTML id attribute for file inputs (used for label association)
 * @property {string} [border] - Border styling override ('hidden' to remove border)
 * @property {Object} rules - Validation rules using react-hook-form validation schema
 * @property {string} rules.required - Required field validation message
 * @property {Object} [rules.pattern] - Regex pattern validation
 * @property {RegExp} rules.pattern.value - Regular expression for validation
 * @property {string} rules.pattern.message - Error message for pattern validation
 * @property {Object} [rules.validate] - Custom validation functions (for file inputs)
 * @property {Function} rules.validate.lessThan5Meg - File size validation (5MB limit)
 * @property {Function} rules.validate.acceptFormats - File format validation
 * @property {Array} [options] - Options for select inputs (only for type: 'select')
 * @property {boolean} [multiple] - Multiple selection flag (only for type: 'select')
 * @property {string} [placeholder] - Placeholder text for select inputs
 * 
 * @example
 * // Usage in EditForm component:
 * <EditForm 
 *   inputPatterns={BASE_CREATE_COURSE_INPUT_PATTERNS}
 *   onAction={handleCourseSubmit}
 *   title="ایجاد دوره جدید"
 * />
 * 
 * @note
 * - Field names must match backend API expectations for course data
 * - File inputs have special validation for size (5MB) and format (image types)
 * - Select input for support status uses string values "true"/"false" to match form data requirements
 * - Editor field (description) uses a rich text editor component for HTML content
 * - Validation messages are in Persian to match user interface language
 */

const BASE_CREATE_COURSE_INPUT_PATTERNS = [
  {
    name: "title",
    type: "text",
    classes: "mt-1 text-sm",
    label: {
      message: "عنوان دوره را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "عنوان دوره نمیتواند خالی باشد",
      pattern: {
        value: /^.{3,}$/,
        message: "عنوان دوره کوتاه است",
      },
    },
  },
  {
    name: "overview",
    type: "text",
    classes: "mt-1 text-sm",
    label: {
      message: "توضیحات دوره را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "توضیحات دوره نمیتواند خالی باشد",
      pattern: {
        value: /^.{10,}$/,
        message: "توضیحات دوره کوتاه است",
      },
    },
  },
  {
    name: "icon",
    type: "file",
    id: "icon",
    classes: "hidden",
    border: "hidden",
    label: {
      for: "icon",
      message: "انتخاب آیکون دوره",
      classes:
        "text-sm bg-blue-400 text-white rounded-md cursor-pointer text-center py-2 px-4",
    },
    rules: {
      required: "آیکون دوره انتخاب نشده است",
      validate: {
        lessThan5Meg: (files) => {
          return (
            files?.[0]?.size < 5 * 1024 * 1024 ||
            "حجم فایل باید کمتر از 5 مگابایت باشد"
          );
        },
        acceptFormats: (files) => {
          const allowedFormats = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/webp",
            "image/tiff",
            "image/svg+xml",
            "image/heif",
            "image/heic",
          ];

          return (
            allowedFormats.includes(files?.[0]?.type) || "فرمت فایل مجاز نیست"
          );
        },
      },
    },
  },
  {
    name: "image",
    type: "file",
    id: "image",
    classes: "hidden",
    border: "hidden",
    label: {
      for: "image",
      message: "انتخاب عکس دوره",
      classes:
        "text-sm bg-blue-600 text-white rounded-md cursor-pointer text-center py-2 px-4",
    },
    rules: {
      required: "عکس دوره انتخاب نشده است",
      validate: {
        lessThan5Meg: (files) => {
          return (
            files?.[0]?.size < 5 * 1024 * 1024 ||
            "حجم فایل باید کمتر از 5 مگابایت باشد"
          );
        },
        acceptFormats: (files) => {
          const allowedFormats = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/webp",
            "image/tiff",
            "image/svg+xml",
            "image/heif",
            "image/heic",
          ];

          return (
            allowedFormats.includes(files?.[0]?.type) || "فرمت فایل مجاز نیست"
          );
        },
      },
    },
  },
  {
    name: "studentsCount",
    type: "number",
    classes: "mt-1 text-sm",
    label: {
      message: "تعداد دانشجویان",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "تعداد دانشجویان نمیتواند خالی باشد",
      pattern: {
        value: /^(?:[1-9]\d*)$/,
        message: "مقدار وارد شده نامعتبر است ",
      },
    },
  },
  {
    name: "duration",
    type: "number",
    classes: "mt-1 text-sm",
    label: {
      message: "مدت زمان دوره",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "مدت زمان دوره نمیتواند خالی باشد",
      pattern: {
        value: /^(?:[1-9]\d*)$/,
        message: "زمان وارد شده نامعتبر است ",
      },
    },
  },
    {
    name: "isSupport",
    type: "select",
    rules: {
      required: "وضعیت پشتیبانی انتخاب نشده",
    },
    options: [
      { label: "پشتیبانی دارد", value: "true" },
      { label: "پشتیبانی ندارد", value: "false" },
    ],
    multiple: false,
    placeholder: "وضعیت پشتیبانی",
  },
 {
    name: "price",
    type: "number",
    classes: "mt-1 text-sm",
    label: {
      message: "قیمت دوره",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "قیمت دوره نمیتواند خالی باشد",
      pattern: {
        value: /^(0|[1-9]\d*)$/,
        message: "قیمت وارد شده نامعتبر است ",
      },
    },
  },
  {
    name : 'description',
    type : 'editor',
    rules : {
      required : 'توضیحات دوره باید باید شامل هدینگ و پاراگراف باشد'
    },
  }
];

export default BASE_CREATE_COURSE_INPUT_PATTERNS;
