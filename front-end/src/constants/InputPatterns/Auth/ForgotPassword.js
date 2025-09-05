  /**
 * Input patterns for resetting password.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} name - Field name (used for form binding).
 * @property {string} type - Input type (e.g., text, password).
 * @property {Object} label - Label configuration.
 * @property {string} label.message - Label text shown above input.
 * @property {string} label.classes - CSS classes for styling the label.
 * @property {string} classes - CSS classes applied to input field.
 * @property {Object} rules - Validation rules for the field.
 * @property {string} rules.required - Error message if field is empty.
 * @property {Object} rules.pattern - Regex rule and message for validation.
 * @property {RegExp} rules.pattern.value - Regular expression for validation.
 * @property {string} rules.pattern.message - Error message if validation fails.
 *
 * @example
 * - username: must be at least 5 characters
 * - newPassword: must contain uppercase, lowercase, number, and special symbol
 */

  
  const inputPatterns = [
    {
      name: "username",
      type: "text",
      label: {
        message: "نام کاربری را وارد کنید",
        classes: "mb-2",
      },
      classes: "border border-1 border-[#aaaa] rounded-sm py-2 px-4 text-lg",
      rules: {
        required: "نام کاربری نمیتواند خالی باشد",
        pattern: {
          value: /^.{3,}$/,
          message: "نام کاربری کوتاه است",
        },
      },
    },
    {
      name: "newPassword",
      type: "password",
      classes: "border border-1 border-[#aaaa] rounded-sm py-2 px-4 text-lg",
      label: {
        message: "رمز عبور جدید را وارد کنید",
        classes: "mb-2",
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
  ];

  export default inputPatterns