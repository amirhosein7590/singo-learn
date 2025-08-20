import { memo } from "react";
import TableCell from "./TableCell";

function TableRow({ row , onAction , actionPending }) {
  return (
    <tr className="hover:bg-slate-50">
      {row.map((td, tdIndex) => (
        <TableCell
          id={td.id}
          key={tdIndex}
          action={td.action}
          classes={td.classes}
          onAction={onAction}
          text={td.text}
          type={td.type}
          entityData={td.entityData}
          actionPending={actionPending}
          validationPattern={td.validationPattern}
          border={td.border}
          label={td.label}
        />
      ))}
    </tr>
  );
}

export default memo(TableRow);
