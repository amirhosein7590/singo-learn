/**

useEditUser - Custom hook to edit user details.

@description

Sends a PUT request to /users/:id with updated user data.

Shows toast messages for success or error.

Invalidates the users query on success to refresh the table.

@returns {Object}

editUser: Function to update user information.

editUserLoading: Boolean indicating if the edit is in progress.
*/

import { showToastHandler } from "../../../utils/ToastController";
import useAxiosMutate from "../../useAxiosMutate";
import { useQueryClient } from "@tanstack/react-query";

function useEditUser() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const queryClient = useQueryClient();

  const {mutate , isPending : editUserLoading} = useAxiosMutate(
    "users",
    null,
    `/users/:id`,
    { headers },
    "put",
    true
  );

  const editUser = (userId , data)=>{
    mutate(data , {
      urlParams : {id : userId},
      onSuccess : data =>{
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
    editUser,
    editUserLoading
  }
}

export default useEditUser;
