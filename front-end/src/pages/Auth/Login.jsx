import { useEffect } from "react";
function Login() {
  useEffect(()=>{
        document.title = 'ورود'
    },[])
  return (
    <>
      <p>Login Page</p>
    </>
  );
}
export default Login;
