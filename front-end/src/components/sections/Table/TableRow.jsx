/**
 * TableRow Component
 * Renders a single row of the table using the `TableCell` component for each cell.
 *
 * @param {Array<Object>} row - Array of cell data objects for the row. 
 *   Each object contains props required by TableCell (id, text, type, action, etc.)
 * @param {Function} onAction - Callback passed down to TableCell for handling actions (button clicks, file uploads, etc.)
 * @param {boolean} actionPending - Indicates if any action is currently pending.
 * @param {Object} pendingKeysRef - Ref used to track which row/action combinations are pending.
 *
 * @returns {JSX.Element} Table row with mapped TableCell components.
 *
 * @description
 * - Maps over the `row` array and renders a `<TableCell />` for each item.
 * - Passes down all necessary props (data, handlers, validation, etc.) to each TableCell.
 * - Adds hover background effect for better row distinction.
 *
 * @remarks
 * - Rows are dynamically generated based on `tbody` chunking logic inside the Table component.
 * - Optimized with `React.memo` to avoid unnecessary re-renders.
 */


import { memo } from "react";
import TableCell from "./TableCell";

function TableRow({ row, onAction, actionPending, pendingKeysRef }) {
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
          pendingKeysRef={pendingKeysRef}
        />
      ))}
    </tr>
  );
}

export default memo(TableRow);
