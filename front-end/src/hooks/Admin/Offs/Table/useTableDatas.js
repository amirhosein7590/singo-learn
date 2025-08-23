/**

useTableDatas - Custom hook to generate table data for displaying discounted courses.

@description

Fetches discounted courses using useDiscountCourses.

Maps course data to table row format, formatting prices with PriceToPersian.

Adds action buttons for editing and removing discounts with proper classes and labels.

Returns table headers, rows, and refs for infinite scrolling.

@returns {Object}

tableDatas: Object containing thead and tbody for table rendering.

loadMoreOff: Ref for infinite scroll observer to load more discounted courses.

isFetchingNextOff: Boolean indicating if next page of discounted courses is loading.
*/

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
