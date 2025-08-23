/**

useCreateInputPattern - Generates input patterns for creating a teacher.

@description

Maps BASE_CREATE_TEACHER_INPUT_PATTERNS and adds course options for multi-select inputs.

Updates dynamically based on the courses data from the API.

@returns {Object}

createTeacherInputPattern: Array of input patterns ready to use in forms.
*/

import BASE_CREATE_TEACHER_INPUT_PATTERNS from "../../../../constants/InputPatterns/Admin/Teachers/CreateTeacher";
import { useMemo } from "react";

function useCreateInputPattern(coursesLoading, courses) {
  let createTeacherInputPattern = useMemo(() => {
    if (courses) {
      let courseInfos = courses.map((course) => ({
        label: course.title,
        value: course.id,
      }));
      return BASE_CREATE_TEACHER_INPUT_PATTERNS.map((input) =>
        input.type == "select" && input.multiple
          ? { ...input, options: courseInfos }
          : input
      );
    }
  }, [coursesLoading, courses]);

  return { createTeacherInputPattern };
}
export default useCreateInputPattern;
