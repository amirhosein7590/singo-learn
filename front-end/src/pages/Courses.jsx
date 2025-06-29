import { useEffect } from "react";
function Courses() {
useEffect(()=>{
        document.title = 'دوره ها'
    },[])

  return (
    <>
      <p>Courses Page</p>
    </>
  );
}
export default Courses;
