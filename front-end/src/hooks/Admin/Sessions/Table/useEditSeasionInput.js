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
