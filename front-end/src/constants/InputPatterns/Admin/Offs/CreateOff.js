/**
 * Input configuration patterns for discount creation form
 * 
 * Defines the form structure and validation rules for creating new discount entries
 * Used by EditForm component to generate discount creation forms with validation
 * Includes percentage input and course selection for discount application
 * 
 * @constant {Array<Object>} BASE_CREATE_OFF_INPUT_PATTERN - Array of input field configurations for discount creation
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('number', 'select')
 * @property {string} classes - CSS classes for styling the input element
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form validation schema
 * @property {string} rules.required - Required field validation message
 * @property {Object} rules.pattern - Regex pattern validation for percentage
 * @property {RegExp} rules.pattern.value - Regular expression to prevent zero values (^(?!0$)\d+$)
 * @property {string} rules.pattern.message - Error message for invalid percentage
 * @property {Array} options - Empty array for dynamic course options (populated from API)
 * @property {boolean} multiple - Multiple selection flag (false for single course selection)
 * @property {string} placeholder - Placeholder text for course selection dropdown
 * 
 * @example
 * // Expected server data for options population:
 * const coursesFromApi = [
 *   { label: "React دوره پیشرفته", value: "course_123" },
 *   { label: "JavaScript مقدماتی", value: "course_456" }
 * ];
 * 
 * @note
 * - Percentage validation prevents zero values but allows any positive number
 * - Course options array is initially empty and should be populated from API response
 * - Designed for single course discount application (multiple: false)
 * - Pattern regex (^(?!0$)\d+$) allows any positive integer except standalone zero
 */

const BASE_CREATE_OFF_INPUT_PATTERN = [
  {
    name: "percentage",
    type: "number",
    classes: "mt-1 text-sm",
    label: {
      message: "درصد تخفیف را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "درصد تخفیف نمیتواند خالی باشد",
      pattern: {
        value: /^(?!0$)\d+$/,
        message: "تخفیف وارد شده نامعتبر است",
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
];

export default BASE_CREATE_OFF_INPUT_PATTERN