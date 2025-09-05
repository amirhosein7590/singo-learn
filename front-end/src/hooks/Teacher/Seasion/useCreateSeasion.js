import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";
import { useQueryClient } from "@tanstack/react-query";

function useCreateSeasion() {
  const { token } = JSON.parse(localStorage.getItem("userInfos")) || {};
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { mutate, createSeasionLoading } = useAxiosMutate(
    "seasions",
    null,
    "/sessions",
    { headers },
    "post",
    true
  );

  const queryClient = useQueryClient();

  const createSeasion = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        const successMessage = res?.message;
        showToastHandler(successMessage, "success");
        queryClient.invalidateQueries({ queryKey: ["seasions"] });
      },
      onError: (err) => {
        const errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  return {
    createSeasion,
    createSeasionLoading,
  };
}

export default useCreateSeasion;
