/**
 * Input configuration patterns for editing the logged-in teacher's profile
 * 
 * Defines the structure and validation rules for updating teacher profile information
 * Used by EditForm component to dynamically generate the form fields
 * Includes username, fullname, email, and phone number fields
 * 
 * @constant {Array<Object>} BASE_TEACHER_PROFILE_INPUT_PATTERNS
 * @property {string} name - Unique identifier matching backend field names
 * @property {string} type - Input type ('text', 'email')
 * @property {string} classes - CSS classes for styling the input element
 * @property {Object} label - Label configuration object
 * @property {string} label.message - Label text displayed to the user
 * @property {string} label.classes - CSS classes for styling the label
 * @property {Object} rules - Validation rules using react-hook-form validation schema
 * @property {string} rules.required - Required field validation message
 * @property {Object} rules.pattern - Regex pattern validation
 * @property {RegExp} rules.pattern.value - Regex pattern for input
 * @property {string} rules.pattern.message - Error message for invalid input
 * 
 * @example
 * <EditForm
 *   title="ویرایش پروفایل مدرس"
 *   inputPatterns={BASE_TEACHER_PROFILE_INPUT_PATTERNS}
 *   onAction={handleUpdateProfile}
 * />
 * 
 * @note
 * - All fields are editable by the teacher for updating their own profile
 * - Username requires minimum 5 characters
 * - Fullname requires minimum 5 Persian characters (English letters not allowed)
 * - Email must be valid according to regex
 * - Phone number must be valid Iranian mobile number format (09xxxxxxxxx)
 */


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
