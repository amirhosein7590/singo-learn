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