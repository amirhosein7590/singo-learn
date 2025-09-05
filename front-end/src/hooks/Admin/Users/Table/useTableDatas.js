/**

useTableDatas - Generates table data for the users list.

@description

Maps allUsers into table rows including text fields and action buttons.

Converts phone numbers to Persian digits.

Action buttons include viewCourses, edit, ban, and remove with specific styles.

@returns {Object}

tableDatas: Object containing thead and tbody for the table component.
*/

import { useMemo } from "react";
import BASE_TABLE_DATAS from "../../../../constants/Table/Admin/Users";
import ToPersianDigit from "../../../../utils/ToPersianDigit";

function useTableDatas(allUsers) {
  const tableDatas = useMemo(() => {
    if (!allUsers) return BASE_TABLE_DATAS;

    const actionTexts = {
      remove: "حذف",
      ban: "بن",
      edit: "ویرایش",
      viewCourses: "مشاهده دوره ها",
    };

    const btnClasses = {
      baseClasses: "text-white !text-xs !py-2 !px-4 rounded-md",
      remove: "bg-rose-600 text-white hover:bg-rose-70 !py-0",
      viewCourses: "bg-sky-600 text-white hover:bg-sky-700",
      edit: "bg-amber-600 text-white hover:bg-amber-700",
      ban: "bg-slate-600 text-white hover:bg-slate-700",
    };

    return {
      thead: BASE_TABLE_DATAS.thead,

      tbody: allUsers.flatMap((user) => [
        ...["username", "fullname", "phonenumber", "email"].map((field) => ({
          id: field,
          type: "text",
          text:
            field == "phonenumber" ? ToPersianDigit(user[field]) : user[field],
        })),
        ...["viewCourses", "edit", "ban", "remove"].map((action) => ({
          id: user.id,
          entityData: user,
          action,
          type: "button",
          text: actionTexts[action],
          classes: `${btnClasses.baseClasses} ${btnClasses[action]}`,
        })),
      ]),
    };
  }, [allUsers]);

  return { tableDatas };
}

export default useTableDatas;
