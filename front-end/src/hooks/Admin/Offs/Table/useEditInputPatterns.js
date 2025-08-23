/**

useEditInputPatterns - Custom hook to generate input patterns for editing a discount.

@description

Maps BASE_EDIT_OFF_INPUT_PATTERN and fills the defaultValue field with the current discount value.

Useful for pre-filling form fields when editing an existing discount.

@returns {Object}

editInputPatterns: Function that takes a discount object and returns the input patterns with prefilled values.
*/

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