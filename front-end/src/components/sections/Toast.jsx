import { useEffect } from "react"

function Toast({message , icon , setShowToast}) {
    useEffect(()=>{
        let timeId = setTimeout(()=>{
            setShowToast(null);
        },5000)

        return ()=> {
            clearTimeout(timeId)
        }
    },[])
  return (
    <div className="toast flex justify-between items-center fixed bg-white py-2 px-6 rounded-lg shadow-lg right-5/12 top-2/12">
        <img src={`../../public/images/${icon}.svg`} alt="" />
        <p className="toast-title mr-1 text-[#363636]">{message}</p>
    </div>
  )
}

export default Toast