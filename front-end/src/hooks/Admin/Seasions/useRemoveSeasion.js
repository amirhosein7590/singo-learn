/**

useRemoveSeasion - Custom hook to handle deletion of a seasion.

@description

Uses useAxiosMutate to send DELETE request to /sessions/:id endpoint.

Shows toast messages for success or error responses.

Invalidates seasions query in react-query cache on success.

@returns {Object}

removeSeasion: Function to delete a seasion by ID.

removeSeasionLoading: Boolean indicating if seasion deletion is in progress.
*/

import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";
function useRemoveSeasion() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const { mutateAsync, isPending: removeSeasionLoading } = useAxiosMutate(
    "seasions",
    null,
    "/sessions/:id",
    { headers },
    "delete",
    true
  );
  const queryClient = useQueryClient();
  const removeSeasion = (seasionId) => {
    mutateAsync(null, {
      urlParams: { id: seasionId },
      onSuccess: (data) => {
        showToastHandler(data?.message, "success");
        queryClient.invalidateQueries({ queryKey: ["seasions"] });
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  return {
    removeSeasion,
    removeSeasionLoading,
  };
}

export default useRemoveSeasion;
