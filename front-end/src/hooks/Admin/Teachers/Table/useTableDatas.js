import { useMemo } from "react";
import BASE_TABLE_DATAS from "../../../../constants/Table/Admin/Teachers";
import useRemoveTeacher from "../useRemoveTeacher";

function useTableDatas(allTeachersCourse, allTeachersData, editTeacher , setShowToast) {
  const {
    removeTeacher,
    removeTeacherLoading,
  } = useRemoveTeacher(setShowToast);

  const tableDatas = useMemo(() => {
    if (!allTeachersData) return BASE_TABLE_DATAS;

    const actionCallbacks = {
      remove: removeTeacher,
      edit: () => {},
      viewCourses: () => {},
    };

    const actionTexts = {
      remove: removeTeacherLoading ? "در حال ارسال" : "حذف",
      edit: "ویرایش",
      viewCourses: "مشاهده دوره ها",
    };

    const loadingButton = {
      remove : removeTeacherLoading
    }

    const btnClasses = {
      baseClasses: "text-white !text-xs !py-2 !px-4 rounded-md",
      remove: "bg-red-600",
      viewCourses: "bg-green-600",
      edit: "bg-blue-600",
    };

    return {
      thead: BASE_TABLE_DATAS.thead,
      tbody: allTeachersData.flatMap((teacher) => [
        ...["username", "fullname", "phonenumber", "email", "stack"].map(
          (field) => ({
            id: teacher.id,
            type: "text",
            text: teacher[field],
          })
        ),
        ...["viewCourses", "remove", "edit"].map((action, index) => ({
          id: index + 1,
          type: "button",
          text: actionTexts[action],
          onClick: () => actionCallbacks[action](teacher.id),
          classes: `${btnClasses.baseClasses} ${btnClasses[action]}`,
          disbled: loadingButton[action]
        })),
      ]),
    };
  }, [allTeachersData]);

  return { tableDatas };
}

export default useTableDatas;
