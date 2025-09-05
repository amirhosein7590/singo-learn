/**
 * Custom hook for listing all courses with infinite scrolling
 * 
 * Wraps `useInfiniteQuery` to handle pagination from backend.
 * Supports custom observer, dynamic URL parameters (selectId), enabling/disabling query, and limit per page.
 * Returns all course data combined, plus helpers for infinite scroll.
 * 
 * @function useListCourses
 * @param {boolean} customeObserver - if true, parent component will handle observer manually
 * @returns {Object}
 *  - courses: Array of all fetched courses
 *  - coursesError: Error object if fetching fails
 *  - coursesLoading: Boolean loading state
 *  - loadMoreRef: Ref to attach to "load more" element for intersection observer
 *  - isFetchingNextPage: Boolean if next page is being fetched
 *  - fetchNextPage: Function to manually fetch next page
 *  - hasNextPage: Boolean if more pages are available
 * 
 * @example
 * const { courses, loadMoreRef, fetchNextPage } = useListCourses(true);
 */


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
