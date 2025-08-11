import BASE_EDIT_OFF_INPUT_PATTERN from "../../../../constants/InputPatterns/Admin/Offs/EditOff";

function useEditInputPatterns() {
  const editInputPatterns = (off)=>{
    return BASE_EDIT_OFF_INPUT_PATTERN.map(input => (
        {...input , defaultValue : off.discount}
    ))
  }

  return {
    editInputPatterns
  }
}

export default useEditInputPatterns