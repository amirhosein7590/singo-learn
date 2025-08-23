/**

useRemoveTeacher - Custom hook to remove a teacher.

@description

Sends a DELETE request to /teachers/:id to remove a teacher.

Displays toast messages for success or error.

Invalidates the teachers query on success to refresh the table.

@returns {Object}

removeTeacher: Function to delete a teacher.

removeTeacherLoading: Boolean indicating if deletion is in progress.
*/

import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "../../useAxiosMutate";
import {showToastHandler } from "../../../utils/ToastController";

function useRemoveTeacher() {
  const queryClient = useQueryClient();
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const {
    mutateAsync,
    isPending: removeTeacherLoading,
  } = useAxiosMutate(
    "teachers",
    null,
    `/teachers/:id`,
    { headers },
    "delete",
    true
  );

  const removeTeacher = (teacherId) => {
    mutateAsync(null, {
      urlParams: { id: teacherId },
      onSuccess: () => {
        showToastHandler('حذف موفق'  , 'success')
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage , 'error')
      }
    });
  };

  return {
    removeTeacher,
    removeTeacherLoading
  }
}

export default useRemoveTeacher;
