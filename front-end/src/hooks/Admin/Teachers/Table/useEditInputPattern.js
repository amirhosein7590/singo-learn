import { useMemo } from "react";
import BASE_EDIT_TEACHER_INPUT_PATTERN from "../../../../constants/InputPatterns/Admin/Teachers/EditTeacher";

function useEditInputPattern() {
  const editTeacherInputHandler = (teacher, courses) => {
    return BASE_EDIT_TEACHER_INPUT_PATTERN.map((input) => {
      if (input.type == "select" && input.multiple) {
        return {
          ...input,
          options: courses.map((course) => ({
            label: course.title,
            value: course.id,
            initialSelect: teacher.courseIds.includes(course.id),
          })),
        };
      }

      if (input.type == "select" && !input.multiple) {
        return {
          ...input,
          options: input.options.map((opt) => ({
            ...opt,
            initialSelect: opt.value == teacher.stack,
          })),
        };
      }

      if (input.type != "select") {
        return {
          ...input,
          defaultValue: teacher[input.name],
        };
      }
    });
  };

  return { editTeacherInputHandler };
}

export default useEditInputPattern;
