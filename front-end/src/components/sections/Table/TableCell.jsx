import { memo } from "react";
import Button from "../../ui/Button";

function TableCell({
  type,
  classes,
  onAction,
  action,
  text,
  entityData,
  actionPending,
}) {
  return (
    <td className="px-3 py-2">
      {type === "button" ? (
        <Button
          classes={classes}
          onclick={() => onAction(entityData, action)}
          disabled={actionPending[action]}
        >
          {action == "ban" && entityData?.isBanned
            ? "رفع بن"
            : action == "ban" && !entityData?.isBanned
            ? "بن"
            : text}
        </Button>
      ) : (
        <p className="text-xs lg:text-sm">{text}</p>
      )}
    </td>
  );
}

export default memo(TableCell);
