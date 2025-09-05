  /**
 * Input patterns for registration form.
 *
 * @constant
 * @type {Array<Object>}
 * @description
 * Provides form fields with validation for user registration.
 *
 * @fields
 * - username: must be at least 5 characters
 * - fullname: must be at least 5 Farsi characters
 * - password: must contain uppercase, lowercase, number, and special symbol
 * - email: must be a valid email format
 * - phonenumber: must be a valid Iranian mobile number (09xxxxxxxxx)
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
      name: "fullname",
      type: "text",
      label: {
        message: "نام و نام خانوادگی را وارد کنید",
        classes: "mb-2",
      },
      classes: "border border-1 border-[#aaaa] rounded-sm py-2 px-4 text-lg",
      rules: {
        required: "نام و نام خانوادگی نمیتواند خالی باشد",
        pattern: {
          value: /^[\u0600-\u06FF\s]{5,}$/,
          message:
            "نام و نام خانوادگی نمیتواند کمتر از 5 کاراکتر و حروف انگلیسی باشد",
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

    {
      name: "email",
      type: "email",
      classes: "border border-1 border-[#aaaa] rounded-sm py-2 px-4 text-lg",
      label: {
        message: "ایمیل را وارد کنید",
        classes: "mb-2",
      },
      rules: {
        required: "ایمیل نمی تواند خالی باشد",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "ایمیل وارد شده معتبر نمی باشد",
        },
      },
    },

    {
      name: "phonenumber",
      type: "text",
      classes: "border border-1 border-[#aaaa] rounded-sm py-2 px-4 text-lg",
      label: {
        message: "شماره موبایل را وارد کنید",
        classes: "mb-2",
      },
      rules: {
        required: "شماره موبایل نمی تواند خالی باشد",
        pattern: {
          value: /^09[۰-۹0-9]{9}$/,
          message: "شماره موبایل وارد شده معتبر نمی باشد",
        },
      },
    },
  ];

  export default inputPatterns