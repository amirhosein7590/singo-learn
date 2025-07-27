import { useEffect } from "react"

function Toast({message , icon , onClose}) {
    useEffect(()=>{
        let timeId = setTimeout(()=>{
            onClose();
        },3000)

        return ()=> {
            clearTimeout(timeId)
        }
    },[])
  return (
    <div className="toast flex justify-between items-center fixed bg-white py-1 px-3 text-sm lg:text-[16px] lg:py-2 lg:px-6 rounded-lg shadow-lg left-1/2 -translate-x-1/2 top-2/12">
        <img src={`../../public/images/${icon}.svg`} alt="" />
        <p className="toast-title mr-1 text-[#363636]">{message}</p>
    </div>
  )
}

export default Toast