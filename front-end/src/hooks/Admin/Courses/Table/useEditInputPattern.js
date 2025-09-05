/**
 * Custom hook for populating edit form input patterns with existing data
 * 
 * Transforms base input patterns by injecting existing course data into appropriate fields
 * Handles different input types including text, select, editor, and file inputs
 * Ensures proper data formatting and initial selection states for form pre-population
 * 
 * @function useEditInputPattern
 * @returns {Object} Hook utilities
 * @returns {Function} editInputPatterns - Function to populate input patterns with course data
 * 
 * @example
 * const { editInputPatterns } = useEditInputPattern();
 * const populatedPatterns = editInputPatterns(courseData);
 * 
 * @note
 * - For editor fields: Converts HTML content from course data using htmlConverter
 * - For select fields: Sets initialSelect flag based on current course values
 * - For text/number fields: Injects defaultValue from course data
 * - For file fields: Returns unchanged as files are handled separately in edit mode
 * - Handles edge cases like zero values and empty strings appropriately
 */

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
