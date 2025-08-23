/**

useCreateUser - Hook for registering a new user.

@description

Sends a POST request to /register with user data and role='user'.

Displays success or error toast notifications.

Invalidates the users query on success to refresh the table.

@returns {Object}

addUser: Function to register a new user.

createUserLoading: Boolean indicating if registration is in progress.
*/

import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";

function useCreateUser() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const { mutate, isPending: createUserLoading } = useAxiosMutate(
    "users",
    null,
    "/register",
    { headers },
    "post",
    false
  );

  const queryClient = useQueryClient()

  const addUser = (data) => {
    mutate(
      { ...data, role: "user" },
      {
        onSuccess: (data) => {
          let successMessage = data?.message;
          showToastHandler(successMessage, "success");
          queryClient.invalidateQueries({queryKey : ['users']})
        },
        onError: (err) => {
          let errorMessage = err.response.data.error;
          showToastHandler(errorMessage, "error");
        },
      }
    );
  };

  return {
    addUser,
    createUserLoading,
  };
}

export default useCreateUser;
