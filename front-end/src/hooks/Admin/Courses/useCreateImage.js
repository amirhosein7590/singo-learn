/**
 * Custom hook for uploading images to external host
 * 
 * Handles image uploads using Bytescale API (or any external file host)
 * Returns uploaded image URL to be used in other hooks (`useImageCourse`, `useIconCourse`, etc.)
 * 
 * @function useCreateImage
 * @returns {Object}
 *  - addImage: Async function to upload a single file, returns uploaded file data
 *  - isPending: Boolean indicating upload is in progress
 * 
 * @example
 * const { addImage, isPending } = useCreateImage();
 * const result = await addImage(file); // returns { files: [{ fileUrl: '...' }] }
 */


import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { showToastHandler } from "../../../utils/ToastController";

function useCreateImage() {
  const headers = {
    Authorization: `Bearer public_G22nht29PccNxn4bRcskXEovAAjf`,
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["Image"],
    mutationFn: async (data) => {
      try {
        let res = await axios.post(
          "https://api.bytescale.com/v2/accounts/G22nht2/uploads/form_data",
          data,
          {
            headers,
          }
        );
        let image = await res.data;
        return image;
      } catch (error) {
        showToastHandler("خطا در آپلود عکس", "error");
      }
    },
  });

  const addImage = async (file) => {
    let formData = new FormData();
    formData.append("files", file);
    return await mutateAsync(formData);
  };

  return {
    isPending,
    addImage,
  };
}

export default useCreateImage;
