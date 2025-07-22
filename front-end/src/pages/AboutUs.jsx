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
      {isPending && <h1>loading ...</h1>}
      {isError && <h1 className="text-red-600">error ...</h1>}
    </>
  );
}
export default AboutUs;
