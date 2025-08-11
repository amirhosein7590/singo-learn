import { useMemo } from "react";
import BASE_TABLE_DATAS from "../../../../constants/Table/Admin/Teachers";
import ToPersianDigit from '../../../../utils/ToPersianDigit'

function useTableDatas(allTeachersData) {
  const tableDatas = useMemo(() => {
    if (!allTeachersData) return BASE_TABLE_DATAS;

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
      tbody: allTeachersData.flatMap((teacher) => [
        ...["username", "fullname", "phonenumber", "email", "stack"].map(
          (field) => ({
            id: teacher.id,
            type: "text",
            text:
              field == "phonenumber"
                ? ToPersianDigit(teacher[field])
                : teacher[field],
          })
        ),
        ...["viewCourses", "edit", "ban", "remove"].map((action) => ({
          entityData: teacher,
          type: "button",
          action,
          text: actionTexts[action],
          classes: `${btnClasses[action]} ${btnClasses.baseClasses}`,
        })),
      ]),
    };
  }, [allTeachersData]);

  return { tableDatas };
}

export default useTableDatas;
