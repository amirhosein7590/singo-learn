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
        value: /^.{5,}$/,
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
