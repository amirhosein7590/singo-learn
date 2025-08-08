let setShowAlert = null;
function alertSetter(setter) {
  setShowAlert = setter;
}

function showAlertHandler({title, icon, onConfirm, cancelText, confirmText}) {
  setShowAlert({
    visible: true,
    onConfirm : ()=>{
      setShowAlert(prev => ({...prev , visible : false}))
      onConfirm();
    },
    cancelText: cancelText || "خیر",
    confirmText: confirmText || "بله",
    title,
    icon: icon || "warning",
    onCancel: () => {
      setShowAlert((prev) => ({ ...prev, visible: false }));
    },
  });
}

export {alertSetter , showAlertHandler}