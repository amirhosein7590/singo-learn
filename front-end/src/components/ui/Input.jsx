import { memo } from "react";
function Input(props) {

  const changeVisibilityPasswrod = (e) => {
    let { setShowPassword, showPassword } = props;
    setShowPassword((prev) => !prev);
    let visibleIcon = e.currentTarget.children[0];
    if (showPassword) {
      visibleIcon.src = "../../public/images/inVisible.svg";
    } else {
      visibleIcon.src = "../../public/images/visible.svg";
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
            type={props.showPassword ? 'text' : 'password'}
            className={props.classes}
            value={props.value ?? ""}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <i
            className="absolute top-[60%] left-2 cursor-pointer"
            onClick={(e) => changeVisibilityPasswrod(e)}
          >
            <img src="../../public/images/inVisible.svg" alt="" />
          </i>
        </>
      ) : (
        <>
          {props.label && (
            <label className={props.label.classes}>{props.label.message}</label>
          )}
          <input
            type={props.type}
            className={props.classes}
            placeholder={props.placeholder}
            value={props.value ?? ""}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </>
      )}
    </>
  );
}

export default memo(Input);
