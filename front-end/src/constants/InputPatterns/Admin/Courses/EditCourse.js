  /**
 * Input configuration patterns for course editing form with pre-filled values
 * 
 * Defines the form structure, validation rules, and default values for course editing forms
 * Specifically designed for EditForm component to pre-populate fields with existing course data
 * Contains default values for text inputs and initial selection states for select inputs
 * 
 * @constant {Array<Object>} BASE_EDIT_COURSE_INPUT_PATTERNS - Array of input field configurations for editing
 * @property {string} name - Unique identifier matching backend field names and course object properties
 * @property {string} type - Input type ('text', 'number', 'select', 'editor')
 * @property {string} [defaultValue] - Pre-filled value for text/number inputs (empty string by default)
 * @property {string} classes - CSS classes for styling the input element
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form validation schema
 * @property {string} rules.required - Required field validation message
 * @property {Object} [rules.pattern] - Regex pattern validation
 * @property {Array} [options] - Options for select inputs with initial selection states
 * @property {boolean} [multiple] - Multiple selection flag for select inputs
 * @property {string} [placeholder] - Placeholder text for select inputs
 * @property {string} [initialValue] - Initial value for editor field (HTML content)
 * 
 * @example
 * // Usage with useEditInputPattern hook:
 * const { editInputPatterns } = useEditInputPattern();
 * const populatedPatterns = editInputPatterns(courseData);
 * 
 * <EditForm 
 *   inputPatterns={populatedPatterns}
 *   onAction={handleCourseUpdate}
 *   title="ویرایش دوره"
 * />
 * 
 * @note
 * - Default values are initially empty and will be populated by useEditInputPattern hook
 * - Select inputs use 'initialSelect' property on options to set initial selection
 * - Editor field uses 'initialValue' for pre-populating rich text content
 * - File inputs are intentionally omitted as they are handled separately in edit mode
 * - The useEditInputPattern hook dynamically populates values from existing course data
 */

const BASE_EDIT_COURSE_INPUT_PATTERNS = [
  {
    name: "title",
    type: "text",
    classes: "mt-1 text-sm",
    defaultValue: "",
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
    defaultValue: "",

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
    name: "studentsCount",
    type: "number",
    defaultValue: "",

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
    defaultValue: "",

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
    defaultValue: "",
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
    name: "description",
    type: "editor",
    rules: {
      required: "توضیحات دوره باید باید شامل هدینگ و پاراگراف باشد",
    },
    initialValue: "",
  },
];

export default BASE_EDIT_COURSE_INPUT_PATTERNS;
