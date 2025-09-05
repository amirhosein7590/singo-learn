/**
 * Handles fetching data from public or private APIs using React Query's useQuery.
 *
 * @param {string} key - Unique key for query.
 * @param {Array} deps - Dependencies to include in the queryKey.
 * @param {string} url - API endpoint.
 * @param {Object|null} headers - Optional headers.
 * @param {boolean} [isPrivate=false] - Use private axios instance if true.
 * @param {boolean} [enabled=true] - Whether the query should automatically run.
 * @param {string|boolean} [selectedId=false] - Optional ID to append to URL.
 * @returns {Object} - Returns query object with data, error, and isPending.
 */

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
