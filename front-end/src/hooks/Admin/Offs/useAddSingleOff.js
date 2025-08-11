import useAxiosMutate from "../../../hooks/useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";

function useAddSingleOff() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const { mutate, isPending: addSingleOffLoading } = useAxiosMutate(
    "offs",
    null,
    "/offs/:id",
    { headers },
    "post",
    true
  );

  const queryClient = useQueryClient();

  const addSingleOff = (courseId, data) => {
    mutate(data, {
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
    addSingleOff,
    addSingleOffLoading,
  };
}

export default useAddSingleOff;
