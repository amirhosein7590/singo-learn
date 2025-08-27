/**
 * Custom hook for creating a new course
 * 
 * Handles image and icon uploads using `useCreateImage`, then sends course data to backend
 * Combines multiple async operations: upload image, upload icon, create course
 * Invalidates react-query cache for "sessions" after successful creation
 * 
 * @function useCreateCourse
 * @returns {Object}
 *  - createCourse: Function to create a course, accepts object with image, icon, and other fields
 *  - createCoursePending: Boolean indicating if any step (image/icon upload or course creation) is in progress
 * 
 * @example
 * const { createCourse, createCoursePending } = useCreateCourse();
 * createCourse({ image: [file], icon: [file], title, price, ... });
 */



import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";
import useCreateImage from "./useCreateImage";

function useCreateCourse() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const queryClient = useQueryClient();
  const { addImage, isPending: addImagePending } = useCreateImage();
  const { addImage : addIcon, isPending: addIconPending } = useCreateImage();

  const { mutate, isPending: createCoursePending } = useAxiosMutate(
    "courses",
    null,
    "/courses",
    { headers },
    "post",
    true
  );

  const createCourse = async ({ image, icon, ...others }) => {
    let imageRes = await addImage(image[0]);
    let iconRes = await addIcon(icon[0]);
    let imageUrl = `https://ucarecdn.com/${imageRes.file}/`
    let iconUrl = `https://ucarecdn.com/${iconRes.file}/`;

    mutate(
      { image: imageUrl, icon: iconUrl, ...others },
      {
        onSuccess: (data) => {
          let successMessage = data.message;
          showToastHandler(successMessage, "success");
          queryClient.invalidateQueries({ queryKey: ["sessions"] });
        },
        onError: (err) => {
          let errorMessage = err.response.data.error;
          showToastHandler(errorMessage, "error");
        },
      }
    );
  };

  return {
    createCoursePending:
      addIconPending || addImagePending || createCoursePending,
      createCourse
  };
}

export default useCreateCourse;
