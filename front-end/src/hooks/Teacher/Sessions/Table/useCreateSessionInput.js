import { useMemo } from "react";
import CreateSession from "../../../../constants/InputPatterns/Teacher/Seasion/CreateSession";
import useListSeasion from "../../Seasion/useListSeasion";

function useCreateSessionInput() {
  const {
    sessions,
    sessionsLoading,
    fetchNextSession,
    hasNextSession,
    isFetchingNextSession,
  } = useListSeasion(true);
  const createSessionInputs = useMemo(() => {
    if (!sessions || isFetchingNextSession || sessionsLoading) return CreateSession.map(input => (
      input.type == 'select' ? {...input , placeholder : 'درحال بارگذاری ...'} : input
    ))

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
