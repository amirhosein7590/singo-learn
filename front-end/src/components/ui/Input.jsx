import { memo } from "react";
function Input(props) {
  const changeVisibilityPasswrod = (e) => {
    let { setShowPassword, showPassword } = props;
    setShowPassword((prev) => !prev);
    let visibleIcon = e.currentTarget.children[0];
    if (showPassword) {      
      visibleIcon.src = "../../public/svg/inVisible.svg";
    } else {
      visibleIcon.src = "../../public/svg/visible.svg";
    }
  };

  const handleChange = (event)=>{
    if (props.type == 'file'){
      props.onChange(event.target.files)
    }
    else {
      props.onChange(event.target.value)
    }
  }

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
            <img src="../../public/svg/inVisible.svg" alt="" />
          </i>
        </>
      ) : (
        <>
          {props.label && (
            <label htmlFor={props.label.for} className={props.label.classes}>{props.label.message}</label>
          )}
          <input
            id={props.id}
            type={props.type}
            defaultValue={props.defaultValue}
            className={`outline-none ${props.classes}`}
            placeholder={props.placeholder}
            onChange={(event) => handleChange(event)}
            value={props.type == 'file' ? undefined : props.value}
          />
        </>
      )}
    </>
  );
}

export default memo(Input);
