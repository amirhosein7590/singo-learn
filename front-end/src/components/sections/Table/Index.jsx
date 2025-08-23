/**
 * Generic table component for displaying data with actions.
 * 
 * @param {Array} thead - Table headers
 * @param {Array} tbody - Table body cells (flattened)
 * @param {boolean} scroll - Enable vertical scroll
 * @param {Function} onAction - Callback triggered when an action is clicked or file selected
 * @param {boolean} actionPending - True if any row action is in progress
 * @param {boolean} isFetchingNextPage - True if fetching more data (infinite scroll)
 * @param {Object} loadMoreRef - Ref attached to bottom row for intersection observer
 * @param {Object} pendingKeysRef - Ref to track pending actions for specific rows
 * 
 * @returns {JSX.Element} Table with headers, rows, actions, and infinite scroll support
 * 
 * @description
 *  - Chunks tbody array based on thead length to form rows
 *  - Uses TableRow component for each row
 *  - Lazy-loads Spinner when fetching next page
 *  - Displays fallback row if no data is available
 *  - Attaches loadMoreRef for infinite scrolling
 *  - Handles onAction for all button and file input actions
 */

import { memo } from "react";
import TableRow from "./TableRow";
import { lazy } from "react";
const Spinner = lazy(()=> import('../Spinner'))

function Table({
  thead,
  tbody,
  scroll,
  onAction,
  actionPending,
  isFetchingNextPage,
  loadMoreRef,
  pendingKeysRef,
}) {
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const onActionHandler = (id, action) => {
    onAction(id, action);
  };
  return (
    <div
      className={`relative flex flex-col w-full ${
        scroll
          ? "lg:h-[330px] h-[230px] overflow-y-auto"
          : "overflow-y-hidden h-auto"
      } text-gray-700 bg-white shadow-md rounded-lg bg-clip-border`}
    >
      <table className="w-full min-w-max text-center table-auto text-slate-800">
        <thead>
          <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
            {thead.map((th) => (
              <th className="px-3 py-2" key={th.id}>
                <p className="text-xs lg:text-sm leading-tight font-normal">
                  {th.title}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
           {isFetchingNextPage && (
            <tr>
              <td><Spinner size="lg" /></td>
            </tr>
          )}

          {tbody.length > 0 ? (
            chunkArray(tbody, thead.length).map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                row={row}
                actionPending={actionPending}
                onAction={onActionHandler}
                pendingKeysRef={pendingKeysRef}
              />
            ))
          ) : (
            <tr className="text-center"><td className="text-sm lg:text-[16px]">اطلاعاتی جهت نمایش وجود ندارد</td></tr>
          )}
          <tr className="observer w-1 h-2 opacity-0" ref={loadMoreRef}></tr>
         
        </tbody>
      </table>
    </div>
  );
}

export default memo(Table);
