import useListCourses from "../../Courses/useListCourses.js";
import CreateSeasion from "../../../../constants/InputPatterns/Admin/Sessions/CreateSeasion.js";
import { useMemo } from "react";

function useCreateSeasionInputs() {
  const {
    courses,
    coursesLoading,
    fetchNextPage : fetchNextCourse,
    hasNextPage : hasNextCourse,
    isFetchingNextPage : isFetchingNextCourse,
  } = useListCourses(true);

  const createSeasionInputs = useMemo(() => {
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
    isFetchingNextCourse
  };
}

export default useCreateSeasionInputs;
