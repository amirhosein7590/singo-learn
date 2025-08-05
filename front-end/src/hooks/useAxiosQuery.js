import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../api/axiosPublic";
import axiosPrivate from "../api/axiosPrivate";

function useAxiosQuery(key, deps, url, headers = null, isPrivate = false , enabled=true) {
  const client = isPrivate ? axiosPrivate : axiosPublic;

  return useQuery({
    queryKey: [key, deps],
    queryFn: () => {
      if (!headers) {
        return client.get(url).then((res) => res.data);
      } else {
        return client.get(url, { headers }).then((res) => res.data);
      }
    },
    enabled
  });
}

export default useAxiosQuery;
