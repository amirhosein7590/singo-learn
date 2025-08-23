/**

useEditTeacher - Custom hook to edit teacher details.

@description

Sends a PUT request to /teachers/:id with updated teacher data.

Shows toast messages for success or error.

Invalidates the teachers query on success to refresh the table.

@returns {Object}

editTeacher: Function to update teacher information.

editTeacherPending: Boolean indicating if the edit is in progress.
*/

import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";

function useEditTeacher() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    mutate,
    isPending: editTeacherPending,
  } = useAxiosMutate(
    "teachers",
    null,
    `/teachers/:id`,
    { headers },
    "put",
    true
  );

  const queryClient = useQueryClient();

  const editTeacher = (teacherId, data) => {
    mutate(data, {
      urlParams: { id: teacherId },
      onSuccess: (data) => {
        showToastHandler(data?.message, "success");
        queryClient.invalidateQueries({queryKey : ['teachers']})
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  return {
    editTeacher,
    editTeacherPending
  }
}

export default useEditTeacher;
