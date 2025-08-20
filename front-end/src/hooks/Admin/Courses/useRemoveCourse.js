import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";

function useRemoveCourse() {
  const queryClient = useQueryClient();
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {mutate , isPending : removeCourseLoading} = useAxiosMutate(
    "courses",
    null,
    "/courses/:id",
    { headers },
    "delete",
    true
  );


  const removeCourse = (courseId)=>{
    mutate(null , {
        urlParams : {id : courseId},
         onSuccess: () => {
        showToastHandler('حذف موفق'  , 'success')
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage , 'error')
      }
    })
  }

  return {
    removeCourse,
    removeCourseLoading
  }
}

export default useRemoveCourse;
