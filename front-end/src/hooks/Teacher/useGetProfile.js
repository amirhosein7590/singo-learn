import useAxiosQuery from "../useAxiosQuery";
import { useLocation } from "react-router";

function useGetProfile() {
  const { userId, token } = JSON.parse(localStorage.getItem("userInfos"));
  const reqHeader = { Authorization: `Bearer ${token}` };
  const location = useLocation()
  const { data , isPending } = useAxiosQuery(
    "teacher",
    location,
    `/teachers/${userId}`,
    { reqHeader },
    true
  );

  return {
    data,
    isProfileLoading : isPending
  }
}

export default useGetProfile;
