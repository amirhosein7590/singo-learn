import useAxiosMutate from "../../../hooks/useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";

function useRemoveOff() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const queryClient = useQueryClient();

  const { mutateAsync, removeOffLoading } = useAxiosMutate(
    "offs",
    null,
    "/offs/:id",
    { headers },
    "delete",
    true
  );

  const removeOff = (courseId) => {
    mutateAsync(null, {
      urlParams: { id: courseId },
      onSuccess: (data) => {
        let successMessage = data.message;
        showToastHandler(successMessage, "success");
        queryClient.invalidateQueries({ queryKey: ["offs"] });
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  return {
    removeOff,
    removeOffLoading,
  };
}

export default useRemoveOff;
