  /**
 * Input patterns for login form.
 *
 * @constant
 * @type {Array<Object>}
 * @description
 * Defines validation and styling for login fields.
 *
 * @example
 * - username: minimum length 5
 * - password: at least 8 chars, containing uppercase, lowercase, number, symbol
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
      name: "password",
      type: "password",
      classes: "border border-1 border-[#aaaa] rounded-sm py-2 px-4 text-lg",
      label: {
        message: "رمز عبور را وارد کنید",
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