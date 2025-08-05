import useAxiosQuery from "../../useAxiosQuery";
function useListCourses() {
  const {
    data: courses,
    error: coursesError,
    isPending: coursesLoading,
  } = useAxiosQuery("courses", null, "/courses", null, false);

  return {
    courses,
    coursesError,
    coursesLoading,
  };
}

export default useListCourses;
