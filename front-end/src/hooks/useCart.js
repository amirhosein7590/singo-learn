import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "./useAxiosMutate";
import useAxiosQuery from "./useAxiosQuery";

export function useCart() {
  const queryClient = useQueryClient();
  const userInfos = JSON.parse(localStorage.getItem("userInfos"));
  const accessToken = userInfos?.token;
  const userId = userInfos?.userId;
  const reqHeader = { Authorization: `Bearer ${accessToken}` };
  
  const {
    mutate,
    data: addCartData,
    error: addCartError,
    isPending: addCartPending,
  } = useAxiosMutate("cart", null, "/cart/add", reqHeader, "post", true);


  const { data: allCoursesInCart } = useAxiosQuery(
    "cart",
    null,
    "/cart",
    reqHeader,
    true
  );

  const {
    mutate: purchaseCourse,
    data : purchaseData,
    error: purchaseError,
    isPending: purchasePending,
  } = useAxiosMutate(
    "purchase",
    null,
    "/purchase",
    { reqHeader },
    "post",
    true
  );

  const mutationConfig = {
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey : ['cart']})
    }
  }

  const { data: purchasedCourses } = useAxiosQuery(
    "purchase",
    null,
    `/user-courses/${userId}`,
    {
      reqHeader,
    },
    true
  );

  const {
    mutate: removeCourse,
    data : removeFromCartData,
    error: removeCourseError,
    isPending: removeCoursePending,
  } = useAxiosMutate("cart", null, "/cart/remove", { reqHeader }, "post", true);

  const addToCart = (courseId ) => {
    mutate(
      {courseId},
      {...mutationConfig}
    );
  };

  const isInCart = (courseId) => {
    if (!allCoursesInCart?.cart) return false;
    return allCoursesInCart.cart.some((course) => course.id == courseId);
  };

  const purchase = (courseIds) => {    
    purchaseCourse( {courseIds}, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["purchase"] });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  const removeFormCart = (courseId ) => {
    removeCourse({courseId} , {
      ...mutationConfig
    })
  };

  const isPurchasedCourse = (courseId) => {
    if (purchasedCourses?.courses){
      return purchasedCourses.courses.some(course => course.id == courseId)
    }
  };

  const totalPrices = ()=>{
    return allCoursesInCart?.cart.reduce((acc , curr)=>{
      acc += curr.price;
      return acc
    },0)
  }

  return {
    addToCart,
    isInCart,
    addCartError,
    addCartPending,
    addCartData,
    allCoursesInCart,
    purchasedCourses,
    purchase,
    purchaseData,
    purchaseError,
    purchasePending,
    removeFormCart,
    removeCourseError,
    removeCoursePending,
    removeFromCartData,
    isPurchasedCourse,
    totalPrices
  };

}
export default useCart;
