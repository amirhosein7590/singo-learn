const BASE_CREATE_SESSION_INPUT_PATTERN = [
  {
    name: "duration",
    type: "number",
    classes: "mt-1 text-sm",
    label: {
      message: "مدت زمان جلسه",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "مدت زمان جلسه نمیتواند خالی باشد",
      pattern: {
        value: /^(?:[1-9]\d*)$/,
        message: "زمان وارد شده نامعتبر است ",
      },
    },
  },
  {
    name: "title",
    type: "text",
    classes: "mt-1 text-sm",
    placeholder: "مثال : آموزش Promise",
    label: {
      message: "عنوان جلسه",
      classes: "text-xs absolute -top-4 bg-white pt-2 px-2",
    },
    rules: {
      required: "عنوان جلسه نمیتواند خالی باشد",
      pattern: {
        value: /^.{5,}$/,
        message: "عنوان جلسه نمیتواند کمتر از ",
      },
    },
  },
  {
    name: "seasionId",
    type: "select",
    rules: {
      required: "سرفصل انتخاب نشده است",
    },
    options: [],
    multiple: false,
    placeholder: "انتخاب سر فصل",
  },
  {
    name: "file",
    type: "file",
    id: "videoUrl",
    classes: "hidden",
    border: "hidden",
    label: {
      for: "videoUrl",
      message: "انتخاب ویدئو",
      classes:
        "text-sm bg-blue-600 text-white w-30 rounded-md cursor-pointer text-center py-2 px-4",
    },
    rules: {
      required: "ویدئو انتخاب نشده است",
      validate: {
        lessThan20Meg: (files) => {
          return (
            files?.[0]?.size < 20 * 1024 * 1024 ||
            "حجم فایل باید کمتر از 20 مگابایت باشد"
          );
        },
        acceptFormats: (files) => {
          const allowedFormats = [
            "video/mp4",
            "video/mkv",
            "video/webm",
            "video/mov",
            "video/avi",
            "video/wmv",
            "video/flv",
            "video/mts",
            "video/m2ts",
            "video/flv"
          ];
          return allowedFormats.includes(files?.[0]?.type) || "فرمت فایل مجاز نیست";
        },
      },
    },
  },
];

export default BASE_CREATE_SESSION_INPUT_PATTERN;
