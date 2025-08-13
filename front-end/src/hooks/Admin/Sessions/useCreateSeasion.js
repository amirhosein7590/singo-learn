import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";
function useCreateSeasion() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const queryClient = useQueryClient();

  const { mutate, createSeasionLoading } = useAxiosMutate(
    "seasion", // may be later change to seasions
    null,
    "/sessions", // may be later change to seasions
    { headers },
    "post",
    true
  );

  const createSeasion = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        showToastHandler(data?.message, "success");
        queryClient.invalidateQueries({ queryKey: ["seasion"] }); // may be later change to seasions
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
