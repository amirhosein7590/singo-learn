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
