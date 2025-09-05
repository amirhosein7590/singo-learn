
/**
 * Custom hook to transform raw course data into table-ready structure.
 * 
 * This hook converts an array of courses into a table format that can be directly
 * consumed by a Table component. It maps course fields to table cells, formats
 * price, support status, and attaches action buttons or file inputs for editing
 * course details, images, and icons.
 * 
 * @param {Array} courses - Array of course objects fetched from the server
 * 
 * @returns {Object} tableDatas - Object containing thead and tbody for table
 * @property {Array} tableDatas.thead - Table headers
 * @property {Array} tableDatas.tbody - Flattened array of table row cells including:
 *  - Fields: title, price, duration, studentsCount, isSupport
 *      - price is formatted to Persian currency using PriceToPersian
 *      - isSupport is converted to readable text
 *  - Actions:
 *      - editIcon: file input for updating course icon
 *      - editImage: file input for updating course image
 *      - remove: button to delete course
 *      - edit: button to edit course details
 *  - Each action includes:
 *      - id: unique identifier for the action
 *      - entityData: original course object
 *      - action: action type (edit, remove, editIcon, editImage)
 *      - type: "button" or "file"
 *      - text: label for the button/input
 *      - classes: Tailwind CSS classes for styling
 *      - validationPattern: rules for file inputs, including max size and accepted formats
 */

import { useMemo } from "react";
import TABLE_DATAS from "../../../../constants/Table/Admin/Courses";
import PriceToPersian from "../../../../utils/PriceToPersian";

function useTableDatas(courses) {
  const tableDatas = useMemo(() => {
    if (!courses) return TABLE_DATAS;

    const actionText = {
      remove: "حذف",
      edit: "ویرایش",
      editImage: "ویرایش عکس دوره",
      editIcon: "ویرایش آیکون دوره",
    };

    const btnClasses = {
      baseClasses: "text-white !text-xs !py-2 !px-4 rounded-md",
      remove: "bg-rose-600 hover:bg-rose-70 !py-0",
      edit: "bg-amber-600 hover:bg-amber-700",
      editImage: "bg-blue-600",
      editIcon: "bg-blue-400",
    };

    return {
      thead: TABLE_DATAS.thead,
      tbody: courses.flatMap((course) => [
        ...["title", "price", "duration", "studentsCount", "isSupport"].map(
          (field) =>
            field == "isSupport"
              ? {
                  id: field,
                  type: "text",
                  text:
                    course[field] == true ? "پشتیبانی دارد" : "پشتیبانی ندارد",
                }
              : field == "price"
              ? {
                  id: field,
                  type: "text",
                  text:
                    course[field] == 0
                      ? "رایگان"
                      : `${PriceToPersian(course[field])} تومان`,
                }
              : {
                  id: field,
                  type: "text",
                  text: course[field],
                }
        ),
        ...["editIcon", "editImage"].map((action) => ({
          id: `${action}/${course.id}`,
          entityData: course,
          action,
          type: "file",
          text: actionText[action],
          classes: "hidden",
          border: "hidden",
          label: {
            message:action == 'editIcon' ?  "انتخاب آیکون دوره" : 'انتخاب عکس دوره',
            classes:
              "text-xs bg-blue-400 text-white rounded-md cursor-pointer text-center py-2 px-4",
          },
          validationPattern: {
            required: "عکس دوره انتخاب نشده",
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
                  allowedFormats.includes(files?.[0]?.type) ||
                  "فرمت فایل مجاز نیست"
                );
              },
            },
          },
        })),

        ...["remove", "edit"].map((action) => ({
          id: action,
          entityData: course,
          action,
          type: "button",
          text: actionText[action],
          classes: `${btnClasses[action]} ${btnClasses.baseClasses}`,
        })),
      ]),
    };
  }, [courses]);

  return {
    tableDatas,
  };
}

export default useTableDatas;
