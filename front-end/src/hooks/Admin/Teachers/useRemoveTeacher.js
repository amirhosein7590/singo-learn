import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "../../useAxiosMutate";
import {showToastHandler } from "../../../utils/ToastController";

function useRemoveTeacher() {
  const queryClient = useQueryClient();
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const {
    mutate,
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
    mutate(null, {
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
