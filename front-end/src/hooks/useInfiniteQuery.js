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