import useAxiosQuery from "../../useAxiosQuery";

function useTeachersList() {
  const {token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    data: allTeachersData,
    error: allTeachersError,
    isPending: allTeachersLoading,
  } = useAxiosQuery("teachers", null, "/teachers?_embed=courses", { headers }, true);

  return {
    allTeachersData,
    allTeachersError,
    allTeachersLoading
  }
}

export default useTeachersList;
