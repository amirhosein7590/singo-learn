/**

useUsersList - Fetches paginated list of users with infinite scroll.

@description

Uses useInfiniteQuery to fetch users.

Filters out admin users to prevent deletion.

Supports loading more users on scroll.

@returns {Object}

allUsers: Array of users excluding admins.

allUsersLoading: Boolean indicating initial fetch status.

allUsersError: Error object if query fails.

loadMoreRef: Ref to attach to observer for infinite scroll.

isFetchingNextUser: Boolean indicating if next page is being fetched.
*/

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
