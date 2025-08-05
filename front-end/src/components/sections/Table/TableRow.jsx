import { memo } from "react";
import TableCell from "./TableCell";

function TableRow({ row }) {
  return (
    <tr className="hover:bg-slate-50">
      {row.map((td, tdIndex) => (
        <TableCell
          key={tdIndex}
          classes={td.classes}
          onClick={td.onClick}
          text={td.text}
          type={td.type}
        />
      ))}
    </tr>
  );
}

export default memo(TableRow);
