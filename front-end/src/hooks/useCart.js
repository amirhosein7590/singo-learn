import { useQueryClient } from "@tanstack/react-query";
import useAxiosMutate from "./useAxiosMutate";
import useAxiosQuery from "./useAxiosQuery";

export function useCart() {
  const queryClient = useQueryClient();
  const accessToken = JSON.parse(localStorage.getItem("userInfos"))?.token;
  const reqHeader = { Authorization: `Bearer ${accessToken}` };

  const {mutate , data : cartData ,  error , isPending} = useAxiosMutate("cart" , null , '/cart/add' , reqHeader , 'post' , true)
  const {data : allCoursesInCart} = useAxiosQuery("cart" , null , '/cart' , reqHeader , true)
  
  const addToCart = courseId => {
    mutate({courseId} , {
        onSuccess : data => {
            queryClient.invalidateQueries({queryKey : ["cart"]});
        }
    })
  }

  const isInCart = courseId => {
    if (!allCoursesInCart?.cart) return false;
    return allCoursesInCart.cart.some(course => course.id == courseId);
  }

return {addToCart , isInCart , error , isPending , cartData}
}
export default useCart