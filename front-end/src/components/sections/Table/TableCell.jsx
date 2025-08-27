/**
 * TableCell Component
 * Flexible table cell renderer that can display:
 * - A button (with pending state handling)
 * - A file input (with validation & async action handling)
 * - Plain text
 *
 * @param {string} type - Type of the cell ("button" | "file" | "text").
 * @param {string} classes - Custom CSS classes applied to button/input.
 * @param {Function} onAction - Callback triggered on button click or file upload success.
 * @param {string} action - The action identifier (e.g., "ban", "upload").
 * @param {string} text - Text content for the cell (used for plain text or button label).
 * @param {Object} entityData - Entity object related to the row (e.g., user, course, etc.)
 * @param {Object} actionPending - Tracks global pending states keyed by action.
 * @param {Object} validationPattern - Validation rules passed to `react-hook-form` Controller.
 * @param {boolean} border - Optional flag for border styling (not directly used in render here).
 * @param {Object} label - Label configuration for file input (text, for attribute, message).
 * @param {string} id - Unique identifier for the cell/input field.
 * @param {Object} pendingKeysRef - Ref to track which (entityId:action) is pending.
 *
 * @returns {JSX.Element} Table cell containing text, button, or input, plus optional toast notifications.
 *
 * @description
 * - **Button Mode**: Renders a button, disables it if action is pending. Special handling for "ban" toggles between "بن" / "رفع بن".
 * - **File Mode**: Renders an `<Input type="file" />` controlled by `react-hook-form`.
 *   - Validates file before calling `onAction`.
 *   - Displays dynamic label messages (e.g., "در حال ارسال ..").
 * - **Text Mode**: Simply renders the provided text.
 * - Error handling:
 *   - Uses `react-hook-form` to validate inputs and shows toast on validation error.
 *   - Registers a toast setter for displaying error/success notifications.
 *
 * @remarks
 * - Uses `Toast` component (lazy-loaded) for error messages.
 * - Uses `pendingKeysRef` to prevent duplicate actions per entity+action combination.
 * - Optimized with `React.memo`.
 * - Local `showToast` state allows multiple cells to independently manage toast visibility.
 */


import { memo } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { lazy } from "react";
const Toast = lazy(() => import("../Toast"));
import {
  resgisterToastSetter,
  showToastHandler,
} from "../../../utils/ToastController";
import { useState } from "react";

function TableCell({
  type,
  classes,
  onAction,
  action,
  text,
  entityData,
  actionPending,
  validationPattern,
  border,
  label,
  id,
  pendingKeysRef,
}) {
  const {
    control,
    trigger,
    formState: { errors, submitCount },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [showToast, setShowToast] = useState({});

  useEffect(() => {
    const fieldError = errors?.[action]?.message;
    if (fieldError) {
      showToastHandler(fieldError, "error");
    }
  }, [submitCount, errors, action]);

  useEffect(() => {
    resgisterToastSetter(setShowToast);
  }, []);

  const localyPending = (courseId, action) => {
    return pendingKeysRef.current.has(`${courseId}:${action}`);
  };

  return (
    <>
      <td className="px-3 py-2">
        {type === "button" ? (
          <Button
            classes={classes}
            onclick={() => onAction({ entityData, action })}
            disabled={
              actionPending[action] && localyPending(entityData.id, action)
            }
          >
            {action == "ban" && entityData?.isBanned
              ? "رفع بن"
              : action == "ban" && !entityData?.isBanned
              ? "بن"
              : text}
          </Button>
        ) : type == "file" ? (
          <form action="">
            <Controller
              name={action}
              control={control}
              rules={validationPattern}
              disabled={actionPending[action]}
              render={({ field }) => (
                <Input
                  id={id}
                  disabled={
                    actionPending[action] &&
                    localyPending(entityData.id, action)
                  }
                  type={type}
                  onChange={async (files) => {
                    field.onChange(files);
                    let isValid = await trigger(action);
                    if (isValid) {
                      onAction({ entityData, action, files });
                    }
                  }}
                  label={{
                    ...label,
                    for: id,
                    message:
                      actionPending[action] &&
                      localyPending(entityData.id, action)
                        ? "در حال ارسال .."
                        : label.message,
                  }}
                  classes={classes}
                  onBlur={() => trigger(action)}
                />
              )}
            />
          </form>
        ) : (
          <p className="text-xs lg:text-sm">{text}</p>
        )}
        {showToast?.visible && <Toast {...showToast} />}
      </td>
    </>
  );
}

export default memo(TableCell);
