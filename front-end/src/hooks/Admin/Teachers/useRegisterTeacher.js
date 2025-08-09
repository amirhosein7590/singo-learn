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
