const BASE_ADMIN_PROFILE_INPUT_PATTERNS = [
    {
      name: "username",
      type: "text",
      classes: "mt-1 text-sm",
      label: {
        message: "نام کاربری جدید را وارد کنید",
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
      name: "fullname",
      type: "text",
      classes: "mt-1 text-sm",
      label: {
        message: "نام و نام خانوادگی جدید را وارد کنید",
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
        message: "ایمیل جدید را وارد کنید",
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
        message: "شماره موبایل جدید را وارد کنید",
        classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
      },
      rules: {
        required: "شماره موبایل نمی تواند خالی باشد",
        pattern: {
          value: /^09[0-9]{9}$/,
          message: "شماره موبایل وارد شده معتبر نمی باشد",
        },
      },
    },
  ];

  export default BASE_ADMIN_PROFILE_INPUT_PATTERNS