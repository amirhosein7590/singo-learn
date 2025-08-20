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
    let imageUrl = imageRes.files[0].fileUrl;
    let iconUrl = iconRes.files[0].fileUrl;

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
