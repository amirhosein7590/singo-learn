import useListCourses from "../../Courses/useListCourses";
import BASE_CREATE_OFF_INPUT_PATTERN from "../../../../constants/InputPatterns/Admin/Offs/CreateOff";
import { useMemo } from "react";

function useCreateInputPattern() {
  const { courses, coursesError, coursesLoading } = useListCourses();
  const createInputPattern = useMemo(() => {
    return BASE_CREATE_OFF_INPUT_PATTERN.flatMap((input) =>
      input.type == "select"
        ? {
            ...input,
            options:courses && courses.map((course) => ({
              label: course.title,
              value: course.id,
            })),
          }
        : input
    );
  }, [courses, coursesLoading]);


  return {createInputPattern}
}

export default useCreateInputPattern;
