/**

useTeachersList - Hook to fetch paginated list of teachers with infinite scroll.

@description

Uses useInfiniteQuery to fetch teachers along with their courses.

Supports loading more teachers on scroll.

@returns {Object}

allTeachersData: Array of teachers data.

allTeachersError: Error object if query fails.

allTeachersLoading: Boolean indicating initial fetch status.

isFetchingNextTeacher: Boolean indicating if next page is being fetched.

loadMoreRef: Ref to attach to observer for infinite scroll.
*/

import useInfiniteQuery from "../../useInfiniteQuery";

function useTeachersList() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    allData: allTeachersData,
    error: allTeachersError,
    isPending: allTeachersLoading,
    isFetchingNextPage: isFetchingNextTeacher,
    loadMoreRef,
  } = useInfiniteQuery(
    "teachers",
    null,
    "/teachers-with-courses",
    { headers },
    true,
    true,
    false,
    7,
    false
  );

  return {
    allTeachersData,
    allTeachersError,
    allTeachersLoading,
    isFetchingNextTeacher,
    loadMoreRef,
  };
}

export default useTeachersList;
