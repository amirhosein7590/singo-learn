/**

useCreateSession - Custom hook to handle creation of a new session.

@description

Uses useAxiosMutate to send POST request to /sessions endpoint.

Shows toast messages for success or error responses.

Invalidates session query in react-query cache on success.

@returns {Object}

createSession: Function to create a new session.

createSessionLoading: Boolean indicating if session creation is in progress.
*/

import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";
import useCreateVideo from "./useCreateVideo";

function useCreateSession() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const queryClient = useQueryClient();

  const { addVideo, isPending } = useCreateVideo();

  const { mutate, isPending: createSessionPending } = useAxiosMutate(
    "sessions",
    null,
    "/sessions/:id/videos",
    { headers },
    "post",
    true
  );

  const createSession = async ({ file, duration, title, seasionId }) => {
    const video = await addVideo(file[0]);
    const videoUrl = video.files[0].fileUrl;

    mutate(
      { duration, title, videoUrl },
      {
        urlParams: { id: seasionId },
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
    createSession,
    createSessionPending: isPending || createSessionPending,
  };
}

export default useCreateSession;
