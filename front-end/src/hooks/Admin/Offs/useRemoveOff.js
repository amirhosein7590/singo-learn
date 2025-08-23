/**

useRemoveOff - Custom hook to remove a discount from a specific course.

@description

Sends a DELETE request to /offs/:id to remove the discount.

Shows success or error messages using showToastHandler.

Invalidates the "offs" query to refresh the discounted courses list.

@returns {Object}

removeOff: Function to remove a discount from a course by ID.

removeOffLoading: Boolean indicating loading state.
*/


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
