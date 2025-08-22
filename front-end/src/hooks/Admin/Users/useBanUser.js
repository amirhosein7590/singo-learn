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
