import useAxiosQuery from "../../useAxiosQuery";

function useDiscountCourses() {
  const {
    data: discountCoursesData,
    error: discountCoursesError,
    isPending: discountCoursesLoading,
  } = useAxiosQuery("offs", null, "/courses/discounted", null, false);

  return {
    discountCoursesData,
    discountCoursesError,
    discountCoursesLoading
  }
}

export default useDiscountCourses;
