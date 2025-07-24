import { useEffect } from "react";
import useAxiosQuery from "../hooks/useAxiosQuery";
function AboutUs() {
  const {data , isPending , isError} = useAxiosQuery('get/users' , null , '/users' , true)
  useEffect(() => {
    document.title = "درباره ما";
  }, []);
  return (
    <>
      <p>AboutUs Page</p>
      {data && data.map(user => (
        <p key={user.id}>{user.fullname}</p>
      ))}
      {isPending && console.log('pending')}
      {isError && console.log('error')}
    </>
  );
}
export default AboutUs;
