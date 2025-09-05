import useAxiosMutate from "../useAxiosMutate";

/**
 * Custom hook for editing admin profile data
 * 
 * @returns {Object} An object containing:
 *   - updateUser: Function to execute the update request
 *   - updateData: Response data after successful update
 *   - updateError: Error object if update fails
 *   - isUpdating: Boolean indicating if update is in progress
 * 
 * @example
 * const {updateUser, updateData, updateError, isUpdating } = useEditAdmin();
 * 
 * const handleSubmit = (formData) => {
 *   updateUser(formData)
 *     .then(() => showToast('Profile updated successfully'))
 *     .catch(() => showToast('Update failed'));
 * };
 */
function useEditUser() {
  // Retrieve user authentication details from localStorage
  const { userId, token } = JSON.parse(localStorage.getItem("userInfos")) || {};
  
  // Prepare authorization headers
  const headers = { 
    Authorization: `Bearer ${token}` 
  };

  // Use the generic mutation hook for PUT request
  const {
    mutate: updateUser,
    data: updateData,
    error: updateError,
    isPending: isUpdating,
  } = useAxiosMutate(
    "users", // query key for caching
    null, // dependency
    `/users/${userId}`, // endpoint URL
    { headers }, // request header
    "put", // HTTP method
    true // boolean flag provides that request is private or not
  );

  return { 
    updateUser, 
    updateData, 
    updateError, 
    isUpdating 
  };
}

export default useEditUser;