/**

useCreateInputPattern - Custom hook to generate input patterns for creating a discount.

@description

Fetches all courses using useListCourses and maps them into options for the "select" input field.

Merges dynamic course data into BASE_CREATE_OFF_INPUT_PATTERN so the select input can display course titles.

Returns helper functions for infinite scroll of courses (fetchNextCourse, hasNextCourse, isFetchingNextCourse).

@returns {Object}

createInputPattern: Array of input configurations ready to use in a form.

fetchNextCourse: Function to fetch the next page of courses for infinite scroll.

isFetchingNextCourse: Boolean indicating if next page of courses is loading.

hasNextCourse: Boolean indicating if there are more courses to fetch.
*/

import useListCourses from "../../Courses/useListCourses";
import BASE_CREATE_OFF_INPUT_PATTERN from "../../../../constants/InputPatterns/Admin/Offs/CreateOff";
import { useMemo } from "react";

function useCreateInputPattern() {
  const {
    courses,
    coursesError,
    coursesLoading,
    fetchNextPage: fetchNextCourse,
    hasNextPage: hasNextCourse,
    isFetchingNextPage: isFetchingNextCourse,
  } = useListCourses(true);
  const createInputPattern = useMemo(() => {
    return BASE_CREATE_OFF_INPUT_PATTERN.flatMap((input) =>
      input.type == "select"
        ? {
            ...input,
            options:
              courses &&
              courses.map((course) => ({
                label: course.title,
                value: course.id,
              })),
          }
        : input
    );
  }, [courses, coursesLoading]);

  return {
    createInputPattern,
    fetchNextCourse,
    isFetchingNextCourse,
    hasNextCourse,
  };
}

export default useCreateInputPattern;
