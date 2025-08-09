import useAxiosMutate from "../../useAxiosMutate";
import { showToastHandler } from "../../../utils/ToastController";

function useCreateUser() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };

  const { mutate, isPending: createUserLoading } = useAxiosMutate(
    "users",
    null,
    "/register",
    { headers },
    "post",
    false
  );

  const addUser = (data) => {
    mutate(
      { ...data, role: "user" },
      {
        onSuccess: (data) => {
          let successMessage = data?.message;
          showToastHandler(successMessage, "success");
        },
        onError: (err) => {
          let errorMessage = err.response.data.error;
          showToastHandler(errorMessage, "error");
        },
      }
    );
  };

  return {
    addUser,
    createUserLoading,
  };
}

export default useCreateUser;
