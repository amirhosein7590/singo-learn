import { useMemo } from "react";
import BASE_TABLE_DATAS from "../../../../constants/Table/Admin/Teachers";
import useRemoveTeacher from "../useRemoveTeacher";
import uesEditTeacher from "../useEditTeacher";
import { showAlertHandler } from "../../../../utils/AlertController";
import { showModalHandler } from "../../../../utils/ModalController";
import useEditInputPattern from "./useEditInputPattern";
import useBanTeacher from "../useBanTeacher";

function useTableDatas(allTeachersData, courses) {
  const { removeTeacher, removeTeacherLoading } = useRemoveTeacher();
  const { editTeacherInputHandler } = useEditInputPattern();
  const { editTeacher, editTeacherPending } = uesEditTeacher();
  const { banTeacher, banTeacherLoading } = useBanTeacher();

  const tableDatas = useMemo(() => {
    if (!allTeachersData) return BASE_TABLE_DATAS;

    const actionCallbacks = {
      remove: (teacherId) => {
        showAlertHandler({
          title: "آیا از حذف اطمینان دارید ؟",
          icon: "warning",
          cancelText: "انصراف",
          confirmText: "حذف",
          onConfirm: () => removeTeacher(teacherId),
        });
      },
      edit: (teacher) => {
        showModalHandler({
          inputPatterns: editTeacherInputHandler(teacher, courses),
          isEdit: true,
          isPending: editTeacherPending,
          onAction: (data) => {
            editTeacher(teacher.id, data);
          },
          tableData: [],
          title: "ویرایش مدرس",
        });
      },
      viewCourses: (teacher) => {
        let tableData = teacher.courses.map((course) => ({
          id: course.id,
          title: course.title,
        }));

        showModalHandler({
          inputPattern: [],
          isEdit: false,
          isPending: false,
          onAction: false,
          tableData,
          title: "دوره های مدرسین",
        });
      },
      ban: (teacher) => {
        let { id, isBanned } = teacher;
        banTeacher(id, !isBanned);
      },
    };

    const loadingButton = {
      remove: removeTeacherLoading,
      ban: banTeacherLoading,
    };

    const actionTexts = {
      remove: removeTeacherLoading ? "در حال ارسال" : "حذف",
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
            text: teacher[field],
          })
        ),
        ...["viewCourses", "edit", "ban", "remove"].map((action, index) => ({
          id: index + 1,
          type: "button",
          text:
            action == "ban" && !banTeacherLoading
              ? `${teacher.isBanned ? "رفع بن" : "بن"}`
              : action == "ban" && banTeacherLoading
              ? "در حال ارسال"
              : actionTexts[action],
          onClick: () => {
            let parameter = action == "remove" ? teacher.id : teacher;
            actionCallbacks[action](parameter);
          },
          classes: `${btnClasses[action]} ${btnClasses.baseClasses}`,
          disbled: loadingButton[action],
        })),
      ]),
    };
  }, [allTeachersData]);

  return { tableDatas };
}

export default useTableDatas;
