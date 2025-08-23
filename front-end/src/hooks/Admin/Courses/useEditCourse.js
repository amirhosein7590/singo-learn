/**
 * Custom hook for editing a course
 * 
 * Handles PUT request to update course data by ID.
 * Invalidates the "courses" cache on success and shows toast messages.
 * 
 * @function useEditCourse
 * @returns {Object} 
 *  - editCourse: Function to edit a course (courseId, data)
 *  - editCourseLoading: Boolean loading state
 * 
 * @example
 * const { editCourse, editCourseLoading } = useEditCourse();
 * editCourse(courseId, { title: "New Title" });
 */

import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";

function useEditCourse() {
  const queryClient = useQueryClient();
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const { mutate, isPending: editCourseLoading } = useAxiosMutate(
    "courses",
    null,
    "/courses/:id",
    { headers },
    "put",
    true,
  );
  const editCourse = (courseId, data) => {
    mutate(data, {
      urlParams: { id: courseId },
      onSuccess: (data) => {
        let successMessage = data.message;
        showToastHandler(successMessage, "success");
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  return{
    editCourse,
    editCourseLoading
  }
}

export default useEditCourse;
