/**
 * Input configuration patterns for session/lesson creation form
 * 
 * Defines the form structure and validation rules for creating new course sessions/lessons
 * Used by EditForm component to generate session creation forms with validation
 * Includes duration, title, season selection, and video file upload fields
 * 
 * @constant {Array<Object>} BASE_CREATE_SESSION_INPUT_PATTERN - Array of input field configurations for session creation
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('number', 'text', 'select', 'file')
 * @property {string} classes - CSS classes for styling the input element
 * @property {string} placeholder - Example placeholder text for user guidance
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form validation schema
 * @property {string} rules.required - Required field validation message
 * @property {Object} rules.pattern - Regex pattern validation
 * @property {Object} rules.validate - Custom validation functions for file uploads
 * @property {Array} options - Empty array for dynamic season options (populated from API)
 * @property {string} id - HTML id attribute for file input label association
 * @property {string} border - Border styling override ('hidden' to remove border)
 * 
 * @example
 * // Expected server data for options population:
 * const seasonsFromApi = [
 *   { label: "فصل ۱ - مقدمه React", value: "season_123" },
 *   { label: "فصل ۲ - کامپوننت‌ها", value: "season_456" }
 * ];
 * 
 * @note
 * - Duration must be a positive integer representing minutes or seconds
 * - Video file validation includes 20MB size limit and specific video formats
 * - Season options array is initially empty and should be populated from API response
 * - Supported video formats: MP4, MKV, WebM, MOV, AVI, WMV, FLV, MTS, M2TS
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
            "video/flv"
          ];
          return allowedFormats.includes(files?.[0]?.type) || "فرمت فایل مجاز نیست";
        },
      },
    },
  },
];

export default BASE_CREATE_SESSION_INPUT_PATTERN;
