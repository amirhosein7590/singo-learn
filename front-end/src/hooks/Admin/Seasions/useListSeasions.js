
/**

useListSeasions - Custom hook to fetch seasions with pagination.

@description

Uses useInfiniteQuery to fetch seasions along with associated course data.

Supports infinite scrolling using loadMoreSeasion ref.

@returns {Object}

seasions: Array of fetched seasions.

seasionsLoading: Boolean indicating if seasions are loading.

loadMoreSeasion: Ref for intersection observer to trigger loading more seasions.

isFetchingNextSeasion: Boolean indicating if next page of seasions is being fetched.
*/

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
