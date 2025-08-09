import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../api/axiosPublic";
import axiosPrivate from "../api/axiosPrivate";

const handleSelectId = (url, id) => (id ? `${url}${id}` : url);

function useAxiosQuery(
  key,
  deps,
  url,
  headers = null,
  isPrivate = false,
  enabled = true,
  selectedId = false
) {
  const client = isPrivate ? axiosPrivate : axiosPublic;

  return useQuery({
    queryKey: [key, deps, selectedId],
    queryFn: () => {
      const config = headers ? { headers } : undefined;
      return client
        .get(handleSelectId(url, selectedId), config)
        .then((res) => res.data);
    },
    enabled : (enabled || Boolean(selectedId)),
  });
}

export default useAxiosQuery;
