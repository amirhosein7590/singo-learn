/**

useCreateSeasionInputs - Custom hook to generate input patterns for creating a seasion.

@description

Uses useListCourses to fetch courses and maps them into options for the "courseId" select input.

While courses are loading or next page is being fetched, replaces select input with a loading placeholder.

@returns {Object}

createSeasionInputs: Array of input patterns ready for form use.

fetchNextCourse: Function to fetch next page of courses for infinite scroll.

hasNextCourse: Boolean indicating if more courses are available.

isFetchingNextCourse: Boolean indicating if next page of courses is being fetched.

courses: Array of fetched courses.

coursesLoading: Boolean indicating if courses are currently loading.
*/

import useListCourses from "../../Courses/useListCourses.js";
import CreateSeasion from "../../../../constants/InputPatterns/Admin/Sessions/CreateSeasion.js";
import { useMemo } from "react";

function useCreateSeasionInputs() {
  const {
    courses,
    coursesLoading,
    fetchNextPage: fetchNextCourse,
    hasNextPage: hasNextCourse,
    isFetchingNextPage: isFetchingNextCourse,
  } = useListCourses(true);

  const createSeasionInputs = useMemo(() => {
    if (!courses || coursesLoading || isFetchingNextCourse)
      return CreateSeasion.map((input) =>
        input.type == "select"
          ? { ...input, placeholder: "در حال بارگذاری ..." }
          : input
      );
    return CreateSeasion.map((input) =>
      input.type == "select" && input.name == "courseId"
        ? {
            ...input,
            options:
              courses &&
              courses.flatMap((course) => ({
                id: course.id,
                label: course.title,
                value: course.id,
              })),
          }
        : input
    );
  }, [courses, coursesLoading]);

  return {
    createSeasionInputs,
    fetchNextCourse,
    hasNextCourse,
    isFetchingNextCourse,
    courses,
    coursesLoading,
  };
}

export default useCreateSeasionInputs;
