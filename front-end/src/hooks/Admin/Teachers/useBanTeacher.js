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
