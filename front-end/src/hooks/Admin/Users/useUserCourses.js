/**

useUserCourses - Fetches courses of a specific user.

@description

Uses useAxiosQuery to fetch courses based on userId.

Provides loading and error states.

@param {string} userId - ID of the user whose courses are being fetched.

@returns {Object}

userCoursesData: Array of courses for the user.

userCoursesLoading: Boolean indicating loading state.

userCoursesError: Error object if query fails.
*/

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
