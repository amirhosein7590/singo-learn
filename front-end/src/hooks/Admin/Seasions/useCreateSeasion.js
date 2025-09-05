/**

useCreateSeasion - Custom hook to handle creation of a new seasion.

@description

Uses useAxiosMutate to send POST request to /sessions endpoint.

Shows toast messages for success or error responses.

Invalidates seasion query in react-query cache on success.

@returns {Object}

createSeasion: Function to create a new seasion.

createSeasionLoading: Boolean indicating if seasion creation is in progress.
*/

import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";
function useCreateSeasion() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const queryClient = useQueryClient();

  const { mutate, createSeasionLoading } = useAxiosMutate(
    "seasion", 
    null,
    "/sessions", 
    { headers },
    "post",
    true
  );

  const createSeasion = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        showToastHandler(data?.message, "success");
        queryClient.invalidateQueries({ queryKey: ["seasion"] }); 
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  return {
    createSeasion,
    createSeasionLoading
  }
}

export default useCreateSeasion;
