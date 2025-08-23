/**

useCreateSessionInputs - Custom hook to generate input patterns for creating a session.

@description

Uses useListCourses to fetch courses and maps them into options for the "courseId" select input.

While courses are loading or next page is being fetched, replaces select input with a loading placeholder.

@returns {Object}

createSessionInputs: Array of input patterns ready for form use.

fetchNextCourse: Function to fetch next page of courses for infinite scroll.

hasNextCourse: Boolean indicating if more courses are available.

isFetchingNextCourse: Boolean indicating if next page of courses is being fetched.

courses: Array of fetched courses.

coursesLoading: Boolean indicating if courses are currently loading.
*/

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
