/**

useEditSeasion - Custom hook to handle editing an existing seasion.

@description

Uses useAxiosMutate to send PUT request to /sessions/:id endpoint.

Shows toast messages for success or error responses.

Invalidates seasions query in react-query cache on success.

@returns {Object}

editSeasion: Function to edit a seasion with given data and seasion ID.

editSeasionLoading: Boolean indicating if seasion editing is in progress.
*/

import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";

function useEditSeasion() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const { mutate, editSeasionLoading } = useAxiosMutate(
    "seasions",
    null,
    "/sessions/:id",
    { headers },
    "put",
    true
  );
  const queryClient = useQueryClient();
  const editSeasion = (data, seasionId) => {
    mutate(data, {
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
    editSeasion,
    editSeasionLoading
  }
}

export default useEditSeasion;
