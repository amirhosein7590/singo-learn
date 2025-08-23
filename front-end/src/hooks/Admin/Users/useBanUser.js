
/**

useBanUser - Custom hook to ban or unban a user.

@description

Sends a POST request to /ban with user data.

Shows toast messages for success or error.

Invalidates the users query on success to refresh the table.

@returns {Object}

banUser: Function to toggle ban status for a user.

banUserLoading: Boolean indicating if the mutation is in progress.
*/
import { showToastHandler } from "../../../utils/ToastController";
import useAxiosMutate from "../../useAxiosMutate";
import { useQueryClient } from "@tanstack/react-query";

function useBanUser() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const { mutateAsync, isPending: banUserLoading } = useAxiosMutate(
    "users",
    null,
    "/ban",
    { headers },
    "post",
    true
  );
  
  const queryClient = useQueryClient();

  const banUser = (data)=>{
    mutateAsync(data , {
        onSuccess : data => {
            let successMessage = data.message;
            showToastHandler(successMessage , 'success');
            queryClient.invalidateQueries({queryKey : ['users']})
        },
        onError : err => {
            let errorMessage = err.response.data.error;
            showToastHandler(errorMessage , 'error')
        }
    })
  }

  return {
    banUser,
    banUserLoading
  }
}

export default useBanUser;
