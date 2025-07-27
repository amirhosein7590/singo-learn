let setShowToast = null;

const resgisterToastSetter = setter => {
    setShowToast = setter;
}

const showToastHandler = (message , icon) => {
    return new Promise(resolve => {
        if (setShowToast){
            console.log('show toast is not empty !!');
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