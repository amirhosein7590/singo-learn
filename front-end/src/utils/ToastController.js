let setShowToast = null;

const resgisterToastSetter = setter => {
    setShowToast = setter;
}

const showToastHandler = (message , icon) => {
    return new Promise(resolve => {
        if (setShowToast){
            setShowToast({
                message,
                icon,
                visible : true,
                onClose : ()=>{
                    setShowToast({visible : false})
                    resolve()
                }
            })
        }
    })
}

export {resgisterToastSetter , showToastHandler}