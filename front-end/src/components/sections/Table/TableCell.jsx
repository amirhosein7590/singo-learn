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
  return (
    <>
      <td className="px-3 py-2">
        {type === "button" ? (
          <Button
            classes={classes}
            onclick={() => onAction({entityData, action})}
            disabled={actionPending[action]}
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
                  disabled={actionPending[action]}
                  type={type}
                  onChange={async (files) => {
                    field.onChange(files);
                    let isValid = await trigger(action);
                    if (isValid) {
                      onAction({entityData , action , files})
                    }
                  }}
                  label={{
                    ...label,
                    for: id,
                    message: actionPending[action]
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
