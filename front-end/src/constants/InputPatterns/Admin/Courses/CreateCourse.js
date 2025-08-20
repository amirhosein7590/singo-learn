const BASE_CREATE_COURSE_INPUT_PATTERNS = [
  {
    name: "title",
    type: "text",
    classes: "mt-1 text-sm",
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
    name: "icon",
    type: "file",
    id: "icon",
    classes: "hidden",
    border: "hidden",
    label: {
      for: "icon",
      message: "انتخاب آیکون دوره",
      classes:
        "text-sm bg-blue-400 text-white rounded-md cursor-pointer text-center py-2 px-4",
    },
    rules: {
      required: "آیکون دوره انتخاب نشده است",
      validate: {
        lessThan5Meg: (files) => {
          return (
            files?.[0]?.size < 5 * 1024 * 1024 ||
            "حجم فایل باید کمتر از 5 مگابایت باشد"
          );
        },
        acceptFormats: (files) => {
          const allowedFormats = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/webp",
            "image/tiff",
            "image/svg+xml",
            "image/heif",
            "image/heic",
          ];

          return (
            allowedFormats.includes(files?.[0]?.type) || "فرمت فایل مجاز نیست"
          );
        },
      },
    },
  },
  {
    name: "image",
    type: "file",
    id: "image",
    classes: "hidden",
    border: "hidden",
    label: {
      for: "image",
      message: "انتخاب عکس دوره",
      classes:
        "text-sm bg-blue-600 text-white rounded-md cursor-pointer text-center py-2 px-4",
    },
    rules: {
      required: "عکس دوره انتخاب نشده است",
      validate: {
        lessThan5Meg: (files) => {
          return (
            files?.[0]?.size < 5 * 1024 * 1024 ||
            "حجم فایل باید کمتر از 5 مگابایت باشد"
          );
        },
        acceptFormats: (files) => {
          const allowedFormats = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/webp",
            "image/tiff",
            "image/svg+xml",
            "image/heif",
            "image/heic",
          ];

          return (
            allowedFormats.includes(files?.[0]?.type) || "فرمت فایل مجاز نیست"
          );
        },
      },
    },
  },
  {
    name: "studentsCount",
    type: "number",
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
    name : 'description',
    type : 'editor',
    rules : {
      required : 'توضیحات دوره باید باید شامل هدینگ و پاراگراف باشد'
    },
  }
];

export default BASE_CREATE_COURSE_INPUT_PATTERNS;
