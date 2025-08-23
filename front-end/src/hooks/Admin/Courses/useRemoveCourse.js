/**
 * Custom hook to remove a course
 * 
 * Uses `useAxiosMutate` for DELETE request to backend
 * Invalidates react-query cache for courses on success
 * Shows toast messages for success/error
 * 
 * @function useRemoveCourse
 * @returns {Object}
 *  - removeCourse: Function to delete a course by ID
 *  - removeCourseLoading: Boolean loading state
 * 
 * @example
 * const { removeCourse, removeCourseLoading } = useRemoveCourse();
 * removeCourse(courseId);
 */


import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";

function useRemoveCourse() {
  const queryClient = useQueryClient();
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {mutateAsync , isPending : removeCourseLoading} = useAxiosMutate(
    "courses",
    null,
    "/courses/:id",
    { headers },
    "delete",
    true
  );


  const removeCourse = (courseId)=>{
    mutateAsync(null , {
        urlParams : {id : courseId},
         onSuccess: () => {
        showToastHandler('حذف موفق'  , 'success')
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage , 'error')
      }
    })
  }

  return {
    removeCourse,
    removeCourseLoading
  }
}

export default useRemoveCourse;
