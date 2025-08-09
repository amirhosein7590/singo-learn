let setShowModal = null;

function modalSetter(setter) {
  setShowModal = setter;
}

function showModalHandler({
  isEdit,
  inputPatterns,
  isPending,
  onAction,
  title,
  tableData,
  onClose,
}) {
  const onCloseHandler = onClose
    ? () => {
        onClose();
        setShowModal((prev) => ({ ...prev, visible: false }));
      }
    : () => {
        setShowModal((prev) => ({ ...prev, visible: false }));
      };
      
  setShowModal({
    visible: true,
    inputPatterns,
    isEdit,
    isPending,
    onAction,
    title,
    tableData,
    onClose : onCloseHandler
  });
}

export { modalSetter, showModalHandler };
