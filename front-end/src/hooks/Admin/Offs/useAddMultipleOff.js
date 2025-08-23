/**

useAddMultipleOff - Custom hook to apply a discount to all courses at once.

@description

Handles sending a POST request to /offs/all with a discount percentage.

Validates the percentage before sending and shows success or error messages using showToastHandler.

Invalidates the "offs" query after success to refresh the data.

@returns {Object}

addMultipleOff: Function to trigger the discount application.

addMultipleOffLoading: Boolean indicating loading state.
*/

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
