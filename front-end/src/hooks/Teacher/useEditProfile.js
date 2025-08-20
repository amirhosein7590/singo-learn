import { showToastHandler } from "../../utils/ToastController";
import useAxiosMutate from '../useAxiosMutate'

function useEditProfile() {
  const { userId, token } = JSON.parse(localStorage.getItem("userInfos")) || {};
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { mutate, isPending: isUpdating } = useAxiosMutate(
    "teacher", // query key for caching
    null, // dependency
    `/teachers/${userId}`, // endpoint URL
    { headers }, // request header
    "put", // HTTP method
    true // boolean flag provides that request is private or not
  );

  const updateUser = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        const successMessage = res?.message;
        showToastHandler(successMessage, "success");
        
      },
      onError: (err) => {
        const errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  return {
    updateUser,
    isUpdating
  }
}

export default useEditProfile;
