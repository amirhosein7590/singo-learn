import useAxiosQuery from "../../useAxiosQuery";

function useUserCourses(userId) {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Auhtorization: `Bearer ${token}` };
  const {
    data: userCoursesData,
    isPending: userCoursesLoading,
    error: userCoursesError,
  } = useAxiosQuery(
    "users",
    null,
    "/user-courses/",
    { headers },
    true,
    Boolean(userId),
    userId
  );

  return {
    userCoursesData,
    userCoursesError,
    userCoursesLoading,
  }
}

export default useUserCourses;
