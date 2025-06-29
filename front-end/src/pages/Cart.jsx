import { useEffect } from "react";
function Cart() {
  useEffect(()=>{
        document.title = 'سبد خرید'
    },[])

  return (
    <>
      <p>Cart Page</p>
    </>
  );
}
export default Cart;
