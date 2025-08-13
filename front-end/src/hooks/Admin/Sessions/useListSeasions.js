import useInfiniteQuery from "../../useInfiniteQuery";

function useListSeasions() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    allData: seasions,
    isPending: seasionsLoading,
    loadMoreRef: loadMoreSeasion,
    isFetchingNextPage: isFetchingNextSeasion,
  } = useInfiniteQuery(
    "seasions",
    null,
    "/seasions-with-course",
    { headers },
    true
  );

  return {
    seasions,
    seasionsLoading,
    loadMoreSeasion,
    isFetchingNextSeasion,
  };
}

export default useListSeasions;
