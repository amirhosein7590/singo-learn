/**

useRegisterTeacher - Hook for registering a new teacher.

@description

Sends a POST request to /register with teacher data and role='teacher'.

Displays success or error toast notifications.

Invalidates the teachers query on success to refresh the table.

@param {Object} queryClient - React Query client to invalidate queries.

@returns {Object}

registerTeacher: Function to register a new teacher.

registerTeacherLoading: Boolean indicating if the registration is in progress.
*/

import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";

function useRegisterTeacher(queryClient) {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    mutate,
    isPending: registerTeacherLoading,
  } = useAxiosMutate("teachers", null, `/register`, { headers }, "post", true);

  const registerTeacher = (data) => {
    mutate({...data , role : 'teacher'}, {
      onSuccess: (data) => {
        let successMessage = data?.message;
        showToastHandler(successMessage , 'success')
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
      onError : err => {
        console.log(err);
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage , 'error')
      }
    });
  };

  return {
    registerTeacher,
    registerTeacherLoading,
  };
}

export default useRegisterTeacher;
