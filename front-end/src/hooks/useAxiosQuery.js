import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../api/axiosPublic";
import axiosPrivate from "../api/axiosPrivate";

function useAxiosQuery(key, deps, url, isPrivate = false) {
  const client = isPrivate ? axiosPrivate : axiosPublic;

  return useQuery({
    queryKey: [key, deps],
    queryFn: () => client.get(url).then((res) => res.data),
  });
}

export default useAxiosQuery;
