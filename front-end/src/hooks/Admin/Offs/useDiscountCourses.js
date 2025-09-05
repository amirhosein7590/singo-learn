/**

useDiscountCourses - Custom hook to fetch courses with active discounts.

@description

Uses useInfiniteQuery to fetch paginated discounted courses from /courses/discounted.

Returns data, loading state, error state, and refs for infinite scroll.

@returns {Object}

discountCoursesData: Array of courses with discounts.

discountCoursesError: Error object if the query fails.

discountCoursesLoading: Boolean indicating loading state.

loadMoreOff: Ref used for infinite scroll observer.

isFetchingNextOff: Boolean indicating if the next page is loading.
*/

import useInfiniteQuery from "../../useInfiniteQuery";

function useDiscountCourses() {
  const {
    allData: discountCoursesData,
    error: discountCoursesError,
    isPending: discountCoursesLoading,
    isFetchingNextPage: isFetchingNextOff,
    loadMoreRef: loadMoreOff,
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
    isFetchingNextOff,
  };
}

export default useDiscountCourses;
