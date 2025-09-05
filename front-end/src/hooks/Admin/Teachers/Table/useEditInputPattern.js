/**

useEditInputPattern - Prepares input patterns for editing a teacher.

@description

Maps BASE_EDIT_TEACHER_INPUT_PATTERN and sets default values based on a given teacher.

For multi-select course inputs, marks courses that the teacher is already assigned to.

For single-select stack inputs, sets the initially selected option.

@returns {Object}

editTeacherInputHandler: Function that accepts a teacher object and returns input patterns.
*/

import BASE_EDIT_TEACHER_INPUT_PATTERN from "../../../../constants/InputPatterns/Admin/Teachers/EditTeacher";
import useAxiosQuery from "../../../useAxiosQuery";

function useEditInputPattern() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {data : courses} = useAxiosQuery(
    "all-courses",
    null,
    "/all-courses",
    { headers },
    true
  );
  const editTeacherInputHandler = (teacher) => {
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
