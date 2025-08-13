import useInfiniteQuery from "../../useInfiniteQuery";

function useUsersList() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    allData: allUsers,
    isPending: allUsersLoading,
    error: allUsersError,
    loadMoreRef,
    isFetchingNextPage: isFetchingNextUser,
  } = useInfiniteQuery("users", null, "/users", headers, true);

  return {
    allUsers: allUsers && allUsers.filter((user) => user.role != "admin"), // To prevent admin deletion
    allUsersLoading,
    allUsersError,
    loadMoreRef,
    isFetchingNextUser,
  };
}

export default useUsersList;
