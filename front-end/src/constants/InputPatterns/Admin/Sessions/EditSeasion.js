/**
 * Input configuration patterns for season/chapter editing form
 * 
 * Defines the form structure and validation rules for editing existing course seasons/chapters
 * Pre-populated version for season editing with default values from existing data
 * Includes same fields as creation form but with defaultValue support
 * 
 * @constant {Array<Object>} BASE_EDIT_SEASION_INPUT_PATTERN - Array of input field configurations for season editing
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('text', 'select')
 * @property {string} defaultValue - Pre-filled value from existing season data (empty string initially)
 * @property {string} classes - CSS classes for styling the input element
 * @property {string} placeholder - Example placeholder text for user guidance
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form validation schema
 * @property {Array} options - Empty array for dynamic course options (populated from API)
 * 
 * @note
 * - Default values are initially empty and should be populated with existing season data
 * - Course options should include the currently associated course with initialSelect flag
 * - Maintains the same validation rules as creation form for consistency
 * - Payment status selection should reflect the current season's payment status
 */

const BASE_EDIT_SEASION_INPUT_PATTERN = [
  {
    name: "seasion",
    type: "text",
    defaultValue : '',
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
    defaultValue : '',
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

export default BASE_EDIT_SEASION_INPUT_PATTERN;
