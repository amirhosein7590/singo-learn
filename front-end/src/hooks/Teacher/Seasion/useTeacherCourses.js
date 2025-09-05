import useInfiniteQuery from "../../useInfiniteQuery";

function useTeacherCourses(customeObserver) {
  const { userId, token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const {
    allData: teacherCourses,
    hasNextPage,
    loadMoreRef,
    fetchNextPage,
    isFetchingNextPage,
    isPending: teacherCoursesLoading,
  } = useInfiniteQuery(
    "teacherCourses",
    null,
    `/teachers/${userId}/courses`,
    { headers },
    true,
    true,
    false,
    10,
    customeObserver
  );

  return {
    teacherCourses,
    hasNextPage,
    loadMoreRef,
    fetchNextPage,
    isFetchingNextPage,
    teacherCoursesLoading,
  };
}

export default useTeacherCourses;
