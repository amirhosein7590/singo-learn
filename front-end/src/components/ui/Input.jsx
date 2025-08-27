/**
 * Reusable Input component with support for different types.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.type - Input type (e.g., "text", "password", "file", "email").
 * @param {string} [props.id] - Input id for label association.
 * @param {Object} [props.label] - Label configuration.
 * @param {string} props.label.message - Label text.
 * @param {string} props.label.classes - CSS classes for the label.
 * @param {string} [props.label.for] - For attribute to link label with input.
 * @param {string} [props.classes] - CSS classes applied to the input.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string|number} [props.defaultValue] - Default value for the input.
 * @param {string|number} [props.value] - Controlled value for the input (non-file types).
 * @param {boolean} [props.disabled] - Whether the input is disabled.
 * @param {function} props.onChange - Change handler (returns string for text/password, FileList for file).
 * @param {function} [props.onBlur] - Blur event handler.
 * @param {boolean} [props.showPassword] - Whether password input is currently visible.
 * @param {function} [props.setShowPassword] - Setter to toggle password visibility state.
 * @param {Object} [props.toggleVisibleButton] - Optional classes for password toggle icon.
 *
 * @description
 * - Renders:
 *   - A password field with toggleable visibility and eye icon.
 *   - A file input that returns `FileList` on change.
 *   - A generic input for all other types (text, email, etc.).
 * - Dynamically renders label if provided.
 *
 * @example
 * <Input
 *   type="password"
 *   label={{ message: "Enter password", classes: "mb-2" }}
 *   showPassword={showPassword}
 *   setShowPassword={setShowPassword}
 *   onChange={(value) => setPassword(value)}
 * />
 */


import { memo } from "react";
function Input(props) {
  const changeVisibilityPasswrod = (e) => {
    let { setShowPassword, showPassword } = props;
    setShowPassword((prev) => !prev);
    let visibleIcon = e.currentTarget.children[0];
    if (showPassword) {
      visibleIcon.src = "/svg/inVisible.svg";
    } else {
      visibleIcon.src = "/svg/visible.svg";
    }
  };

  const handleChange = (event) => {
    if (props.type == "file") {
      props.onChange(event.target.files);
    } else {
      props.onChange(event.target.value);
    }
  };

  return (
    <>
      {props.type == "password" ? (
        <>
          {props.label && (
            <label className={props.label.classes}>{props.label.message}</label>
          )}
          <input
            type={props.showPassword ? "text" : "password"}
            className={`outline-none ${props.classes}`}
            defaultValue={props.defaultValue}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <i
            className={`absolute ${
              props.toggleVisibleButton
                ? props.toggleVisibleButton?.classes
                : "top-[60%]"
            } left-2 cursor-pointer`}
            onClick={(e) => changeVisibilityPasswrod(e)}
          >
            <img src="/svg/inVisible.svg" alt="" />
          </i>
        </>
      ) : props.type == "file" ? (
        <>
          {props.label && (
            <label htmlFor={props.label.for} className={props.label.classes}>
              {props.label.message}
            </label>
          )}
          <input
            id={props.id}
            type={props.type}
            className={`outline-none ${props.classes}`}
            placeholder={props.placeholder}
            onChange={(event)=> handleChange(event)}
            disabled={props.disabled}
            onBlur={props.onBlur}
          />
        </>
      ) : (
        <>
          {props.label && (
            <label htmlFor={props.label.for} className={props.label.classes}>
              {props.label.message}
            </label>
          )}
          <input
            id={props.id}
            type={props.type}
            defaultValue={props.defaultValue}
            className={`outline-none ${props.classes}`}
            placeholder={props.placeholder}
            disabled={props.disabled}
            onChange={(event) => handleChange(event)}
            {...(props.type !== "file" && {
              value: props.value ?? "",
            })}
          />
        </>
      )}
    </>
  );
}

export default memo(Input);
