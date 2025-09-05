import useTeacherCourses from "../useTeacherCourses";
import CreateSeasion from "../../../../constants/InputPatterns/Teacher/Seasion/CreateSeasion";
import { useMemo } from "react";

function useCreateSeasionInput() {
  const {
    fetchNextPage: fetchNextCourse,
    hasNextPage: hasNextCourse,
    isFetchingNextPage,
    teacherCoursesLoading,
    teacherCourses,
  } = useTeacherCourses();

  const createSeasionInputs = useMemo(() => {
    if (!teacherCourses || teacherCoursesLoading || isFetchingNextPage)
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
              teacherCourses &&
              teacherCourses.flatMap((course) => ({
                id: course.id,
                label: course.title,
                value: course.id,
              })),
          }
        : input
    );
  }, [teacherCourses, teacherCoursesLoading]);

  return {
    createSeasionInputs,
    fetchNextCourse,
    hasNextCourse,
    isFetchingNextPage,
    teacherCourses,
    teacherCoursesLoading,
  };
}

export default useCreateSeasionInput;
