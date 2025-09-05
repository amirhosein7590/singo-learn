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

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["Image"],
    mutationFn: async (data) => {
      try {
        let res = await axios.post(
          "https://upload.uploadcare.com/base/",
          data,
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
    formData.append("file", file);
    formData.append('UPLOADCARE_STORE' , 'auto')
    formData.append('UPLOADCARE_PUB_KEY' , 'd1e05329a7009bb7b3c7')
    return await mutateAsync(formData);
  };

  return {
    isPending,
    addImage,
  };
}

export default useCreateImage;
