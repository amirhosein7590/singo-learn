import BASE_CREATE_TEACHER_INPUT_PATTERNS from "../../../../constants/InputPatterns/Admin/Teacher";
import { useMemo } from "react";

function useTeacherInputPattern(coursesLoading, courses) {
  let teacherInputPattern = useMemo(() => {
    if (courses) {
      let courseInfos = courses.map((course) => ({
        label: course.title,
        value: course.id,
      }));
      return BASE_CREATE_TEACHER_INPUT_PATTERNS.map((input) =>
        input.type == "select" ? { ...input, options: courseInfos } : input
      );
    }
  }, [coursesLoading, courses]);

  return { teacherInputPattern };
}
export default useTeacherInputPattern;
