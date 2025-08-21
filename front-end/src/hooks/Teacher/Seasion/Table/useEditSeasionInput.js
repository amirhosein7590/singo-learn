import EditSeasion from '../../../../constants/InputPatterns/Teacher/Seasion/EditSeasion'
import { useCallback } from "react";
import useTeacherCourses from '../useTeacherCourses'

function useEditSeasionInput() {
  const {teacherCourses , teacherCoursesLoading} = useTeacherCourses()

   const editSeasionInputHandler = useCallback(
    (seasion) => {
      if (!teacherCourses || teacherCourses.length < 1 || teacherCoursesLoading)
        return EditSeasion.map((input) =>
          input.type == "select"
            ? { ...input, plcaeholder: "درحال بارگذاری" }
            : input
        );

      return EditSeasion.map((input) => {
        const baseInput = {
          ...input,
          defaultValue: seasion[input.name] || input.defaultValue,
        };

        if (input.type === "select" && input.name !== "isFree") {
          return {
            ...input,
            options: teacherCourses.flatMap((course) => ({
              label: course.title,
              value: course.id,
              initialSelect: course.id == seasion.courseId,
            })),
          };
        } else if (input.type === "select" && input.name === "isFree") {
          return {
            ...input,
            options: input.options.map((opt) => ({
              ...opt,
              initialSelect: String(seasion.isFree) == opt.value,
            })),
          };
        }
        return baseInput;
      });
    },
    [teacherCourses, teacherCoursesLoading]
  );

  return {
    editSeasionInputHandler,
  };
}

export default useEditSeasionInput