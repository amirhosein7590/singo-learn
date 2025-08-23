/**

useCreateVideo - Custom hook to handle session-video uploads.

@description

Uses useMutation from react-query to upload video files to Bytescale API.

Handles FormData creation and appends the video file before sending POST request.

Shows a toast message if the upload fails.

@returns {Object}

isPending: Boolean indicating if the video upload is in progress.

addVideo: Async function to upload a single video file.
*/

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { showToastHandler } from "../../../utils/ToastController";

function useCreateVideo() {
  const headers = {
    Authorization: `Bearer public_G22nht29PccNxn4bRcskXEovAAjf`,
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["video"],
    mutationFn: async (data) => {
      try {
        let res = await axios.post(
          "https://api.bytescale.com/v2/accounts/G22nht2/uploads/form_data",
          data,
          {
            headers,
          }
        );
        let video = await res.data;
        return video;
      } catch (error) {
        showToastHandler("خطا در آپلود ویدئو", "error");
      }
    },
  });

  const addVideo = async (file) => {
    let formData = new FormData();
    formData.append("files", file);
    return await mutateAsync(formData);
  };

  return {
    isPending,
    addVideo,
  };
}

export default useCreateVideo;
