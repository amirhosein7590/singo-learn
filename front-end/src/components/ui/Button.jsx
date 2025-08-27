/**
 * Reusable Button component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.to] - If provided, renders a `Link` or `NavLink` instead of a button.
 * @param {boolean} [props.isActiveAware] - If true, uses `NavLink` with active state awareness.
 * @param {string|function} [props.classes] - CSS classes or a function returning classes (for NavLink).
 * @param {function} [props.onclick] - Click event handler.
 * @param {boolean} [props.disabled] - Disables the button or link if true.
 * @param {string} [props.type] - Button type (e.g., "button", "submit").
 * @param {string} [props.target] - Target attribute for links (e.g., "_blank").
 * @param {React.ReactNode} props.children - Content inside the button.
 * @param {boolean} [props.end=true] - Whether NavLink should only match exact route.
 *
 * @description
 * - Renders as:
 *   - `<NavLink>` if `to` and `isActiveAware` are provided.
 *   - `<Link>` if only `to` is provided.
 *   - `<button>` if no `to` is provided.
 * - Provides consistent styling for navigation and form buttons.
 *
 * @example
 * <Button to="/dashboard" isActiveAware classes={(isActive) => isActive ? "active" : ""}>
 *   Dashboard
 * </Button>
 */



import { Link, NavLink } from "react-router";
import { memo } from "react";

function Button(props) {

  const isNavLink = props.to && props.isActiveAware; 
  
  if (props.to) {
    return isNavLink ? (
      <NavLink
        to={props.to}
        disabled={props.disabled}
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
        className={`${props.classes} md:text-[16px] outline-none text-[14px] lg:py-2.5 lg:px-5 px-2`}
        target={props.target}
        disabled={props.disabled}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      onClick={props.onclick}
      className={`cursor-pointer outline-none md:text-[16px] text-[14px] lg:py-2.5 lg:px-5 px-2 ${props.classes}`}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default memo(Button);
