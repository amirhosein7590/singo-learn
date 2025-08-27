/**
 * Custom hook for uploading and updating course main image
 * 
 * Uses another custom hook `useCreateImage` to send the file to an external host
 * Receives back a `fileUrl` and updates the corresponding course in the backend
 * 
 * @function useImageCourse
 * @returns {Object} 
 *  - editImage: Function to update course image by courseId and file
 *  - editImageLoading: Boolean indicating loading state (external upload + backend update)
 * 
 * @example
 * const { editImage, editImageLoading } = useImageCourse();
 * editImage(courseId, files); // files is an array from <input type="file"/>
 */


import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import useCreateImage from "./useCreateImage";

function useImageCourse() {
  const queryClient = useQueryClient();
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const { addImage, isPending } = useCreateImage();

  const { mutateAsync, editImageLoading } = useAxiosMutate(
    "courses",
    null,
    "/courses/:id/image",
    { headers },
    "put",
    true
  );

  const editImage = async (courseId, files) => {
    const file = files?.[0];
    let res = await addImage(file);
    let resFile = await res.file;
    let fileUrl = `https://ucarecdn.com/${resFile}/`
    mutateAsync({image : fileUrl}, {
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
    editImage,
    editImageLoading : isPending || editImageLoading
  }
}

export default useImageCourse;
