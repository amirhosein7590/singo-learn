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
