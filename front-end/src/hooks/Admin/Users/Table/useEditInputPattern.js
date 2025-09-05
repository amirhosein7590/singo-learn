/**

useEditInputPattern - Prepares input patterns for editing a user.

@description

Maps BASE_EDIT_USER_INPUT_PATTERN and sets default values based on a given user object.

@returns {Object}

editUserInputPattern: Function that accepts a user object and returns input patterns with default values.
*/

import BASE_EDIT_USER_INPUT_PATTERN from "../../../../constants/InputPatterns/Admin/Users/editUsers";

function useEditInputPattern() {
  const editUserInputPattern = (user) => {
    return BASE_EDIT_USER_INPUT_PATTERN.flatMap((input) => ({
      ...input,
      defaultValue: user[input.name],
    }));
  };

  return { editUserInputPattern };
}

export default useEditInputPattern;
