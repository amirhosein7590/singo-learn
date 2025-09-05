import { useEffect } from "react"

/**
 * this file have duty to reset vertically scrolls when user entered the page
 * @param OriginalComponent 
 * @returns new components  
 */

function withResetScroll(OriginalComponent) {
    return ()=>{
        useEffect(()=>{
            window.scrollTo({top : 0 , behavior : 'smooth'})
        },[])
        return <OriginalComponent />
    }
}

export default withResetScroll