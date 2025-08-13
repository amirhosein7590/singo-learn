import useInfiniteQuery from "../../useInfiniteQuery";

function useListSessions() {
  const { token } = JSON.parse(localStorage.getItem("userInfos"));
  const headers = { Authorization: `Bearer ${token}` };
  const {
    allData: sessions,
    isPending: sessionsLoading,
    fetchNextPage: fetchNextSession,
    hasNextPage: hasNextSession,
    isFetchingNextPage: isFetchingNextSession,
  } = useInfiniteQuery(
    "sessions",
    null,
    "/sessions-with-course",
    { headers },
    true,
    true,
    false,
    10,
    true
  );

  return {
    sessions,
    sessionsLoading,
    hasNextSession,
    isFetchingNextSession,
    fetchNextSession,
  };
}

export default useListSessions;
