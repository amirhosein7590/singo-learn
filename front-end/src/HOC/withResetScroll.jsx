import { useEffect } from "react"

function withResetScroll(OriginalComponent) {
    return ()=>{
        useEffect(()=>{
            window.scrollTo({top : 0 , behavior : 'smooth'})
        },[])
        return <OriginalComponent />
    }
}

export default withResetScroll