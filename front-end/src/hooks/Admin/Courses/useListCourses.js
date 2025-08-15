import useInfiniteQuery from "../../useInfiniteQuery";
function useListCourses(customeObserver) {
  const {
    allData: courses,
    loadMoreRef,
    isFetchingNextPage,
    error: coursesError,
    isPending: coursesLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "courses",
    "null",
    "/courses",
    false,
    false,
    true,
    false,
    null,
    customeObserver
  );

  return {
    courses,
    coursesError,
    coursesLoading,
    loadMoreRef,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
 };
}

export default useListCourses;
