/**

useSessionTableDatas - Custom hook to generate table data for displaying sessions.

@description

Fetches sessions using useListSessions.

Maps session fields (Session, title, course, isFree) to table rows.

Adds action buttons for editing and removing sessions with proper classes and labels.

Uses BASE_SESSION_TABLE_DATAS for table headers.

@returns {Object}

SessionTableDatas: Object containing thead and tbody for table rendering.

loadMoreSession: Ref for infinite scroll observer to load more sessions.

isFetchingNextSession: Boolean indicating if next page of sessions is being fetched.
*/

import useAxiosQuery from "../../../useAxiosQuery";
import EditSeasion from "../../../../constants/InputPatterns/Admin/Sessions/EditSeasion";
import { useCallback } from "react";
function useEditSeasionInput() {
  const {token} = JSON.parse(localStorage.getItem('userInfos'));
  const headers = {Authorization : `Bearer ${token}`}
  const { data: courses, isPending: coursesLoading } = useAxiosQuery(
    "all-courses",
    null,
    "/all-courses",
    {headers},
    true
  );

  const editSeasionInputHandler = useCallback(
    (seasion) => {
      if (!courses || courses.length < 1 || coursesLoading)
        return EditSeasion.map((input) =>
          input.type == "select"
            ? { ...input, plcaeholder: "درحال بارگذاری" }
            : input
        );

      return EditSeasion.map((input) => {
        const baseInput = {
          ...input,
          defaultValue: seasion[input.name] || input.defaultValue,
        };

        if (input.type === "select" && input.name !== "isFree") {
          return {
            ...input,
            options: courses.flatMap((course) => ({
              label: course.title,
              value: course.id,
              initialSelect: course.id == seasion.courseId,
            })),
          };
        } else if (input.type === "select" && input.name === "isFree") {
          return {
            ...input,
            options: input.options.map((opt) => ({
              ...opt,
              initialSelect: String(seasion.isFree) == opt.value,
            })),
          };
        }
        return baseInput;
      });
    },
    [courses, coursesLoading]
  );

  return {
    editSeasionInputHandler,
  };
}

export default useEditSeasionInput;
