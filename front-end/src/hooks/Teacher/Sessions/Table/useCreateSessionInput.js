import { useMemo } from "react";
import CreateSession from "../../../../constants/InputPatterns/Teacher/Seasion/CreateSession";
import useListSeasion from "../../Seasion/useListSeasion";

function useCreateSessionInput() {
  const {
    fetchNextSeasion,
    isFetchingNextSeasion,
    seasions,
    seasionsLoading,
    hasNextSeasion
  } = useListSeasion();
  const createSessionInputs = useMemo(() => {
    if (!seasions || isFetchingNextSeasion || seasionsLoading) return CreateSession.map(input => (
      input.type == 'select' ? {...input , placeholder : 'درحال بارگذاری ...'} : input
    ))


    return CreateSession.map((input) =>
      input.type == "select"
        ? {
            ...input,
            options:
              seasions &&
              seasions.flatMap((session) => ({
                id: session.id,
                label: session.title,
                value: session.id,
              })),
          }
        : input
    );
  }, [seasions, seasionsLoading]);

  return {
    createSessionInputs,
    hasNextSeasion,
    fetchNextSeasion,
    isFetchingNextSeasion,
  };
}

export default useCreateSessionInput;
