import useAxiosMutate from "../../../hooks/useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";

function useAddMultipleOff() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const { mutate, isPending: addMultipleOffLoading } = useAxiosMutate(
    "offs",
    null,
    "/offs/all",
    { headers },
    "post",
    true
  );

  const queryClient = useQueryClient();

  const addMultipleOff = (percentage) => {
    const regex = new RegExp(/^(?!0$)\d+$/);

    if (!regex.test(percentage)) {
      showToastHandler("تخفیف وارد شده نامعتبر است", "error");
      return;
    }

    mutate(
      { percentage },
      {
        onSuccess: (data) => {
          let successMessage = data.message;
          showToastHandler(successMessage, "success");
          queryClient.invalidateQueries({ queryKey: ["offs"] });
        },
        onError: (err) => {
          let errorMessage = err.response.data.error;
          showToastHandler(errorMessage, "error");
        },
      }
    );
  };

  return {
    addMultipleOff,
    addMultipleOffLoading
  }
}

export default useAddMultipleOff;
