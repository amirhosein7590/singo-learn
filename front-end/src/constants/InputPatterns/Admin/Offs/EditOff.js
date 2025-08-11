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
