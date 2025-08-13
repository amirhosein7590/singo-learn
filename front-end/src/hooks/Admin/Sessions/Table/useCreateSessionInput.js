import { useMemo } from "react";
import CreateSession from "../../../../constants/InputPatterns/Admin/Sessions/CreateSession";
import useListSessions from "../useListSessions";

function useCreateSessionInput() {
  const {
    sessions,
    sessionsLoading,
    fetchNextSession,
    hasNextSession,
    isFetchingNextSession,
  } = useListSessions();
  const createSessionInputs = useMemo(() => {
    return CreateSession.map((input) =>
      input.type == "select"
        ? {
            ...input,
            options:
              sessions &&
              sessions.flatMap((session) => ({
                id: session.id,
                label: session.title,
                value: session.id,
              })),
          }
        : input
    );
  }, [sessions, sessionsLoading]);

  return {
    createSessionInputs,
    hasNextSession,
    fetchNextSession,
    isFetchingNextSession,
  };
}

export default useCreateSessionInput;
