import useAxiosQuery from "../../useAxiosQuery";

function useUsersList() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    data: allUsers,
    isPending: allUsersLoading,
    error: allUsersError,
  } = useAxiosQuery("users", null, "/users", { headers }, true, true);

  return {
    allUsers: allUsers && allUsers.slice(1, allUsers.length), // To prevent admin deletion
    allUsersLoading,
    allUsersError,
  };
}

export default useUsersList;
