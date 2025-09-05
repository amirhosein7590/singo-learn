/**

useRemoveUser - Custom hook to remove a user.

@description

Sends a DELETE request to /users/:id to remove a user.

Shows toast messages for success or error.

Invalidates the users query on success to refresh the table.

@returns {Object}

removeUser: Function to delete a user.

removeUserLoading: Boolean indicating if deletion is in progress.
*/

import { showToastHandler } from "../../../utils/ToastController";
import useAxiosMutate from "../../useAxiosMutate";
import { useQueryClient } from "@tanstack/react-query";
function useRemoveUser() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: removeUserLoading } = useAxiosMutate(
    "users",
    null,
    `/users/:id`,
    { headers },
    "delete",
    true
  );

  const removeUser = (userId) => {
    mutateAsync(null, {
      urlParams: { id: userId },
      onSuccess: (data) => {
        let successMessage = data.message;
        showToastHandler(successMessage, "success");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  return {
    removeUser,
    removeUserLoading
  }
}

export default useRemoveUser;
