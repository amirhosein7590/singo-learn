/**

useBanTeacher - Custom hook to ban or unban a teacher.

@description

Sends a POST request to /ban with teacher ID and ban status.

Shows toast messages for success or error.

Invalidates the teachers query on success to refresh the table.

@returns {Object}

banTeacher: Function to toggle ban status for a teacher.

banTeacherLoading: Boolean indicating if the mutation is in progress.
*/

import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";

function useBanTeacher() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: banTeacherLoading } = useAxiosMutate(
    "teachers",
    null,
    "/ban",
    { headers },
    "post",
    true
  );

  const banTeacher = (teacherId, isBanned) => {
    mutateAsync(
      { targetType: "teacher", targetId: teacherId, isBanned },
      {
        onSuccess: (data) => {
          let successMessage = data.message;
          showToastHandler(successMessage, "success");
          queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onError: (err) => {
          let errorMessage = err.response.data.error;
          showToastHandler(errorMessage, "error");
        },
      }
    );
  };

  return {
    banTeacher,
    banTeacherLoading,
  };
}

export default useBanTeacher;
