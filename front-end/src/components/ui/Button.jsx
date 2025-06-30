import { Link, NavLink } from "react-router";
import { memo } from "react";

function Button(props) {

  const isNavLink = props.to && props.isActiveAware; 
  
  if (props.to) {
    return isNavLink ? (
      <NavLink
        to={props.to}
        onClick={props.onclick}
        className={typeof props.classes === 'function' ? 
          ({ isActive }) => props.classes(isActive) : 
          props.classes
        }
        end={props.end || true}
      >
        {props.children}
      </NavLink>
    ) : (
      <Link
        to={props.to}
        onClick={props.onclick}
        className={`${props.classes} md:text-[16px] text-[14px] lg:py-2.5 lg:px-5 px-2`}
        target={props.target}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      onClick={props.onclick}
      className={`cursor-pointer md:text-[16px] text-[14px] lg:py-2.5 lg:px-5 px-2 ${props.classes}`}
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default memo(Button);
