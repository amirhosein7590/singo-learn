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
        value: /^.{5,}$/,
        message: "شماره فصل نمیتواند کمتر از 5 کاراکتر باشد",
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
        value: /^.{5,}$/,
        message: "عنوان فصل نمیتواند کمتر از 5 کاراکتر باشد",
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
