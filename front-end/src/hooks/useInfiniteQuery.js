/**
 * Generic custom hook for infinite pagination queries
 * 
 * Wraps React Query's `useInfiniteQuery` with added features:
 * - Dynamic URL parameter selection (selectedId)
 * - Custom observer for infinite scroll (customeObserver)
 * - Auto-fetch next page when element visible
 * 
 * @function useInfiniteQuery
 * @param {string} key - Query key for react-query caching
 * @param {any} deps - Dependencies for query
 * @param {string} url - API endpoint
 * @param {Object|null} headers - Optional headers
 * @param {boolean} isPrivate - Use private axios instance
 * @param {boolean} enabled - Enable or disable query
 * @param {string|boolean} selectedId - Dynamic URL ID parameter
 * @param {number} limit - Items per page
 * @param {boolean} customeObserver - Parent component handles intersection observer
 * @returns {Object} - All infinite query result fields, plus:
 *   - allData: Flattened array of all pages
 *   - loadMoreRef: Ref for intersection observer
 */


import { useEffect, useRef } from "react";
import { useInfiniteQuery as useRQInfiniteQuery } from "@tanstack/react-query";
import axiosPublic from "../api/axiosPublic";
import axiosPrivate from "../api/axiosPrivate";

const handleSelectId = (url, id) => (id ? `${url}${id}` : url);

function useInfiniteQuery(
  key,
  deps,
  url,
  headers = null,
  isPrivate = false,
  enabled = true,
  selectedId = false,
  limit = 10,
  customeObserver = false
) {
  const client = isPrivate ? axiosPrivate : axiosPublic;
  const loadMoreRef = useRef(null);

  const query = useRQInfiniteQuery({
    queryKey: [key, deps, selectedId],
    queryFn: ({ pageParam = 1 }) => {
      const config = {
        params: { page: pageParam, limit },
        ...(headers ? { headers } : {}),
      };
      return client
        .get(handleSelectId(url, selectedId), config)
        .then((res) => res.data);
    },
    enabled: enabled || Boolean(selectedId),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });

  const allData = query.data?.pages.flatMap((page) => page[key] || []) || [];

  useEffect(() => {
    if (!loadMoreRef.current || customeObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && query.hasNextPage) {
          query.fetchNextPage();
        }
      },
      { threshold: .5 }
    );

    observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [query.hasNextPage]);

  return { ...query, allData, loadMoreRef };
}

export default useInfiniteQuery;