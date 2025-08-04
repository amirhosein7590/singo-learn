import useAxiosQuery from "../../useAxiosQuery";

/**
 * A custom hook for fetching admin profile data from the server
 * 
 * @returns {Object} An object containing:
 *   - profileData: The admin profile data
 *   - profileError: Error object if request fails
 *   - isProfileLoading: Boolean indicating if request is in progress
 * 
 * @example
 * const { profileData, profileError, isProfileLoading } = useAdminProfile();
 * if (isProfileLoading) return <Spinner />;
 * if (profileError) return <Error message={profileError.message} />;
 * return <ProfileCard data={profileData} />;
 */
function useAdminProfile(location) {
  // Get user authentication details from localStorage
  const { userId, token } = JSON.parse(localStorage.getItem("userInfos")) || {};
  
  // Prepare request headers with authorization token
  const headers = { 
    Authorization: `Bearer ${token}` 
  };

  // Fetch admin profile data using the generic axios query hook
  const {
    data: profileData,
    error: profileError,
    isPending: isProfileLoading,
  } = useAxiosQuery(
    "adminProfile", // query key for caching
    location, // dependency 
    `/users/${userId}`, // endpoint URL
    { headers }, // request config
    true // boolean flag provides that request is private or not
  );

  return { 
    profileData, 
    profileError, 
    isProfileLoading 
  };
}

export default useAdminProfile;