import { useMemo } from "react";
import BASE_SEASION_TABLE_DATAS from "../../../../constants/Table/Admin/Seasions";
import useListSeasions from "../useListSeasions";

function useSeasionTableDatas() {
  const { seasions, seasionsLoading, loadMoreSeasion, isFetchingNextSeasion } =
    useListSeasions();
  const seasionTableDatas = useMemo(() => {
    if (!seasions) return BASE_SEASION_TABLE_DATAS;
    const actionText = {
      remove: "حذف",
      edit: "ویرایش",
    };

    const btnClasses = {
      baseClasses: "text-white !text-xs !py-2 !px-4 rounded-md",
      remove: "bg-rose-600 text-white hover:bg-rose-70 !py-0",
      edit: "bg-amber-600 text-white hover:bg-amber-700",
    };
    return {
      thead: BASE_SEASION_TABLE_DATAS.thead,
      tbody:
        seasions &&
        seasions.flatMap((seasion) => [
          ...["seasion", "title", "course", "isFree"].map((field) => ({
            id: field,
            type: "text",
            text:
              field == "course"
                ? seasion.course?.title || seasion?.title
                : field == "isFree"
                ? seasion.isFree
                  ? "رایگان"
                  : "نقدی"
                : seasion[field],
          })),
          ...["edit", "remove"].map((action) => ({
            id: action,
            type: "button",
            text: actionText[action],
            entityData: seasion,
            action,
            classes: `${btnClasses.baseClasses} ${btnClasses[action]}`,
          })),
        ]),
    };
  }, [seasions, seasionsLoading]);

  return {
    seasionTableDatas,
    loadMoreSeasion,
    isFetchingNextSeasion,
  };
}

export default useSeasionTableDatas;
