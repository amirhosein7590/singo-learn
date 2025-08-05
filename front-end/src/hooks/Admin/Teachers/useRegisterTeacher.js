import useAxiosMutate from "../../useAxiosMutate";

function useRegisterTeacher(queryClient) {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    mutate,
    data: registerTeacherData,
    error: registerTeacherError,
    isPending: registerTeacherLoading,
  } = useAxiosMutate("teachers", null, `/register`, { headers }, "post", true);

  const registerTeacher = (data) => {
    mutate({...data , role : 'teacher'}, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });
  };

  return {
    registerTeacherData,
    registerTeacher,
    registerTeacherError,
    registerTeacherLoading,
  };
}

export default useRegisterTeacher;
