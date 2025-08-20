import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import useMutate from "../../useAxiosMutate";

function useEditCourse() {
  const queryClient = useQueryClient();
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const { mutate, isPending: editCourseLoading } = useMutate(
    "courses",
    null,
    "/courses/:id",
    { headers },
    "put",
    true
  );
  const editCourse = (courseId, data) => {
    mutate(data, {
      urlParams: { id: courseId },
      onSuccess: (data) => {
        let successMessage = data.message;
        showToastHandler(successMessage, "success");
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  return{
    editCourse,
    editCourseLoading
  }
}

export default useEditCourse;
