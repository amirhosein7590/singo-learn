/**
 * Input configuration patterns for creating course sessions by teacher
 * 
 * Defines the structure and validation rules for creating new course sessions
 * Used by EditForm component to dynamically generate session creation form fields
 * 
 * @constant {Array<Object>} BASE_CREATE_SESSION_INPUT_PATTERN
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('text', 'number', 'file', 'select')
 * @property {string} classes - CSS classes for styling the input element
 * @property {string} placeholder - Example placeholder text for guidance
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form
 * @property {string} rules.required - Required field validation message
 * @property {Object} rules.pattern - Regex pattern validation for numeric/text fields
 * @property {RegExp} rules.pattern.value - Regex pattern for validation
 * @property {string} rules.pattern.message - Error message for invalid input
 * @property {Object} rules.validate - Custom validation functions for files
 * @property {Array} options - Options for select fields (populated from API)
 * @property {boolean} multiple - Multiple selection flag (false for single selection)
 * 
 * @note
 * - "session" refers to a single class/session within a course season
 * - "seasionId" must be selected from existing seasons
 * - File input is required for session video with max size 20MB
 * - Accepted video formats: mp4, mkv, webm, mov, avi, wmv, flv, mts, m2ts
 */


const BASE_CREATE_SESSION_INPUT_PATTERN = [
  {
    name: "duration",
    type: "number",
    classes: "mt-1 text-sm",
    label: {
      message: "مدت زمان جلسه",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "مدت زمان جلسه نمیتواند خالی باشد",
      pattern: {
        value: /^(?:[1-9]\d*)$/,
        message: "زمان وارد شده نامعتبر است ",
      },
    },
  },
  {
    name: "title",
    type: "text",
    classes: "mt-1 text-sm",
    placeholder: "مثال : آموزش Promise",
    label: {
      message: "عنوان جلسه",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "عنوان جلسه نمیتواند خالی باشد",
      pattern: {
        value: /^.{3,}$/,
        message: "عنوان جلسه نمیتواند کمتر از ",
      },
    },
  },
  {
    name: "seasionId",
    type: "select",
    rules: {
      required: "سرفصل انتخاب نشده است",
    },
    options: [],
    multiple: false,
    placeholder: "انتخاب سر فصل",
  },
  {
    name: "file",
    type: "file",
    id: "videoUrl",
    classes: "hidden",
    border: "hidden",
    label: {
      for: "videoUrl",
      message: "انتخاب ویدئو",
      classes:
        "cursor-pointer outline-none md:text-[16px] text-[14px] lg:py-2.5 px-2 text-white bg-blue-600 w-full md:w-30 rounded-md !py-2 text-center !text-xs lg:!text-sm",
    },
    rules: {
      required: "ویدئو انتخاب نشده است",
      validate: {
        lessThan20Meg: (files) => {
          return (
            files?.[0]?.size < 20 * 1024 * 1024 ||
            "حجم فایل باید کمتر از 20 مگابایت باشد"
          );
        },
        acceptFormats: (files) => {
          const allowedFormats = [
            "video/mp4",
            "video/mkv",
            "video/webm",
            "video/mov",
            "video/avi",
            "video/wmv",
            "video/flv",
            "video/mts",
            "video/m2ts",
            "video/flv",
          ];
          return (
            allowedFormats.includes(files?.[0]?.type) || "فرمت فایل مجاز نیست"
          );
        },
      },
    },
  },
];

export default BASE_CREATE_SESSION_INPUT_PATTERN;
