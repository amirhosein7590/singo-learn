import useInfiniteQuery from "../../useInfiniteQuery";

function useListSeasions() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    allData: seasions,
    isPending: seasionsLoading,
    loadMoreRef: loadMoreSeasion,
    isFetchingNextPage: isFetchingNextSeasion,
    fetchNextPage : fetchNextSeasion,
    hasNextPage : hasNextSeasion
  } = useInfiniteQuery(
    "seasions",
    null,
    "/seasions-with-course",
    { headers },
    true,
    true,
    false,
    10,
    true
  );

  return {
    seasions,
    seasionsLoading,
    loadMoreSeasion,
    isFetchingNextSeasion,
    fetchNextSeasion,
    hasNextSeasion
  };
}

export default useListSeasions;
