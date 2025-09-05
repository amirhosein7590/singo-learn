/**

useEditOff - Custom hook to edit a discount for a specific course.

@description

Sends a PUT request to /offs/:id to update the discount percentage.

Shows success or error messages using showToastHandler.

Invalidates the "offs" query to refresh the data after successful update.

@returns {Object}

editOff: Function to update a course's discount.

editOffLoading: Boolean indicating loading state.
*/

import useAxiosMutate from "../../../hooks/useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";

function useEditOff() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const queryClient = useQueryClient();

  const { mutate, isPending: editOffLoading } = useAxiosMutate(
    "offs",
    null,
    "/offs/:id",
    { headers },
    "put",
    true
  );

  const editOff = (courseId, percentage) => {
    mutate(
      percentage,
      {
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
      }
    );
  };

  return {
    editOff,
    editOffLoading,
  };
}

export default useEditOff;
