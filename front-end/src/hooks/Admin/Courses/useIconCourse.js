/**
 * Custom hook for uploading and updating course icon
 * 
 * Similar to `useImageCourse` but updates the course icon instead
 * Uses `useCreateImage` to upload icon to external host and updates backend
 * 
 * @function useIconCourse
 * @returns {Object} 
 *  - editIcon: Function to update course icon by courseId and file
 *  - editIconLoading: Boolean indicating loading state
 */


import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import useCreateImage from "./useCreateImage";

function useIconCourse() {
  const queryClient = useQueryClient();
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const { addImage, isPending } = useCreateImage();

  const { mutateAsync, editIconLoading } = useAxiosMutate(
    "courses",
    null,
    "/courses/:id/icon",
    { headers },
    "put",
    true
  );

  const editIcon = async (courseId, files) => {
    const file = files?.[0];
    let res = await addImage(file);
    let fileUrl = await res.files[0].fileUrl;
    mutateAsync({icon : fileUrl}, {
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

  return {
    editIcon,
    editIconLoading : isPending || editIconLoading
  }
}

export default useIconCourse;
