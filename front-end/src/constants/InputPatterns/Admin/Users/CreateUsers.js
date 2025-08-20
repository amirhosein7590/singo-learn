const BASE_CREATE_USER_INPUT_PATTERNS = [
  {
    name: "username",
    type: "text",
    classes: "mt-1 text-sm",
    label: {
      message: "نام کاربری را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "نام کاربری نمیتواند خالی باشد",
      pattern: {
        value: /^.{5,}$/,
        message: "نام کاربری کوتاه است",
      },
    },
  },
  {
    name: "password",
    type: "password",
    classes: "mt-1 text-sm",
    label: {
      message: "رمز عبور را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    toggleVisibleButton: {
      classes: "top-[33%]",
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
    name: "fullname",
    type: "text",
    classes: "mt-1 text-sm",
    label: {
      message: "نام و نام خانوادگی را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
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
    name: "email",
    type: "email",
    classes: "mt-1 text-sm",
    label: {
      message: "ایمیل را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
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
    classes: "mt-1 text-sm",
    label: {
      message: "شماره موبایل را وارد کنید",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "شماره موبایل نمی تواند خالی باشد",
      pattern: {
        value: /^09[0-9]{9}$/,
        message: "شماره موبایل وارد شده معتبر نمی باشد",
      },
    },
  }
];

export default BASE_CREATE_USER_INPUT_PATTERNS;
