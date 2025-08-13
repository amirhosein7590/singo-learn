import useInfiniteQuery from "../../useInfiniteQuery";

function useDiscountCourses() {
  const {
    allData: discountCoursesData,
    error: discountCoursesError,
    isPending: discountCoursesLoading,
    isFetchingNextPage : isFetchingNextOff,
    loadMoreRef : loadMoreOff
  } = useInfiniteQuery(
    "offs",
    null,
    "/courses/discounted",
    null,
    false,
    true,
    false,
    5,
    false
  );

  return {
    discountCoursesData,
    discountCoursesError,
    discountCoursesLoading,
    loadMoreOff,
    isFetchingNextOff
  };
}

export default useDiscountCourses;
