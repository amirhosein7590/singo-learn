/**
 * Input configuration patterns for discount editing form
 * 
 * Defines the form structure and validation rules for editing existing discount entries
 * Simplified version for discount editing - only allows percentage modification
 * Course selection is excluded as discounts are typically bound to specific courses
 * 
 * @constant {Array<Object>} BASE_EDIT_OFF_INPUT_PATTERN - Array of input field configurations for discount editing
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('number')
 * @property {string} defaultValue - Pre-filled value from existing discount data (empty string initially)
 * @property {string} classes - CSS classes for styling the input element
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form validation schema
 * @property {string} rules.required - Required field validation message
 * @property {Object} rules.pattern - Regex pattern validation for percentage
 * @property {RegExp} rules.pattern.value - Regular expression to prevent zero values (^(?!0$)\d+$)
 * @property {string} rules.pattern.message - Error message for invalid percentage
 * 
 * @example
 * // Usage in edit mode:
 * const editPatterns = BASE_EDIT_OFF_INPUT_PATTERN.map(pattern => ({
 *   ...pattern,
 *   defaultValue: existingDiscount.percentage.toString()
 * }));
 * 
 * @note
 * - Only includes percentage field as course association cannot be changed in edit mode
 * - Default value is initially empty and should be populated with existing discount percentage
 * - Uses same validation rules as creation form for consistency
 * - Pattern regex (^(?!0$)\d+$) ensures percentage is a positive non-zero integer
 * - Designed for modifying discount percentage while maintaining course association
 */

const BASE_EDIT_OFF_INPUT_PATTERN = [
  {
    name: "percentage",
    type: "number",
    defaultValue : '',
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
];

export default BASE_EDIT_OFF_INPUT_PATTERN
