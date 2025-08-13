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
