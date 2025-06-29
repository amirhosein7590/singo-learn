import { useEffect } from "react";
function AboutUs() {
  useEffect(()=>{
        document.title = 'درباره ما'
    },[])
  return (
    <>
      <p>AboutUs Page</p>
    </>
  );
}
export default AboutUs;
