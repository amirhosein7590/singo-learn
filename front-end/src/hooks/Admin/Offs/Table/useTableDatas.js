import useDiscountCourses from "../useDiscountCourses";
import BASE_TABLE_DATAS from "../../../../constants/Table/Admin/Offs";
import PriceToPersian from "../../../../utils/PriceToPersian";
import { useMemo } from "react";

function useTableDatas() {
  const {
    discountCoursesData,
    discountCoursesLoading,
    loadMoreOff,
    isFetchingNextOff,
  } = useDiscountCourses();

  const tableDatas = useMemo(() => {
    if (!discountCoursesData) return BASE_TABLE_DATAS;
    console.log(discountCoursesData);

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
      thead: BASE_TABLE_DATAS.thead,
      tbody: discountCoursesData.flatMap((off) => [
        ...["title", "discount", "originalPrice", "price"].map((field) => ({
          id: field,
          type: "text",
          text: field == "title" ? off[field] : PriceToPersian(off[field]),
        })),

        ...["edit", "remove"].map((action) => ({
          entityData: off,
          action,
          type: "button",
          text: actionText[action],
          classes: `${btnClasses.baseClasses} ${btnClasses[action]}`,
        })),
      ]),
    };
  }, [discountCoursesData, discountCoursesLoading]);

  return {
    tableDatas,
    loadMoreOff,
    isFetchingNextOff
  };
}

export default useTableDatas;
