import htmlConverter from "../../../../utils/htmlConverter";
import BASE_EDIT_COURSE_INPUT_PATTERN from "../../../../constants/InputPatterns/Admin/Courses/EditCourse";

function useEditInputPattern() {
  const editInputPatterns = (course) => {
    return BASE_EDIT_COURSE_INPUT_PATTERN.map((input) => {
      if (input.type == "editor") {
        return { ...input, initialValue: htmlConverter(course[input.name]) };
      }

      if (input.type == "select") {
        return {
          ...input,
          options: input.options.map((opt) => ({
            ...opt,
            initialSelect: String(course[input.name]) == opt.value,
          })),
        };
      }

      if (input.type == 'file'){
          return {
          ...input
        };
      }

      if (input.type != "select" && input.type != 'file') {
        let value = course[input.name];
        return {
          ...input,
          defaultValue: value == 0 ? "0" : value || "",
        };
      }
    });
  };
  return {
    editInputPatterns,
  };
}

export default useEditInputPattern;
