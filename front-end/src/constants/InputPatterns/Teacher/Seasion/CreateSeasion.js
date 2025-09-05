/**
 * Input configuration patterns for creating course seasons (seasions) by teacher
 * 
 * Defines the structure and validation rules for creating new course seasons
 * Used by EditForm component to dynamically generate season creation form fields
 * 
 * @constant {Array<Object>} BASE_CREATE_SEASION_INPUT_PATTERN
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('text', 'select')
 * @property {string} classes - CSS classes for styling the input element
 * @property {string} placeholder - Example placeholder text for guidance
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form
 * @property {string} rules.required - Required field validation message
 * @property {Object} rules.pattern - Regex pattern validation for text length
 * @property {RegExp} rules.pattern.value - Minimum 5 characters required (^.{5,}$)
 * @property {string} rules.pattern.message - Error message for short input
 * @property {Array} options - Options for select fields (populated from API)
 * @property {boolean} multiple - Multiple selection flag (false for single selection)
 * 
 * @note
 * - "seasion" refers to a course season/folder
 * - "courseId" must be selected from teacher's courses
 * - "isFree" indicates payment status for the season
 */


const BASE_CREATE_SEASION_INPUT_PATTERN = [
  {
    name: "seasion",
    type: "text",
    classes: "mt-1 text-sm",
    placeholder: "مثال : فصل اول",
    label: {
      message: "شماره فصل را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "شماره فصل نمیتواند خالی باشد",
      pattern: {
        value: /^.{3,}$/,
        message: "شماره فصل کوتاه است",
      },
    },
  },
  {
    name: "courseId",
    type: "select",
    rules: {
      required: "دوره انتخاب نشده است",
    },
    options: [],
    multiple: false,
    placeholder: "انتخاب دوره",
  },
  {
    name: "title",
    type: "text",
    classes: "mt-1 text-sm",
    label: {
      message: "عنوان فصل",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "عنوان فصل نمیتواند خالی باشد",
      pattern: {
        value: /^.{3,}$/,
        message: "عنوان فصل کوتاه است",
      },
    },
  },

  {
    name: "isFree",
    type: "select",
    rules: {
      required: "وضعیت پرداخت انتخاب نشده",
    },
    options: [
      { label: "رایگان", value: "true" },
      { label: "نقدی", value: "false" },
    ],
    multiple: false,
    placeholder: "وضعیت پرداخت",
  },
];

export default BASE_CREATE_SEASION_INPUT_PATTERN;
