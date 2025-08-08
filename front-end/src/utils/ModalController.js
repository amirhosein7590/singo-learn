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
}) {
  setShowModal({
    visible: true,
    inputPatterns,
    isEdit,
    isPending,
    onAction,
    title,
    tableData,
    onClose: () => {
      setShowModal((prev) => ({ ...prev, visible: false }));
    },
  });
}

export {modalSetter , showModalHandler}
