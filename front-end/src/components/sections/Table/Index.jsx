import { memo, useEffect } from "react";
import TableRow from "./TableRow";

function Table({
  thead,
  tbody,
  scroll,
  onAction,
  actionPending,
  isFetchingNextPage,
  loadMoreRef,
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
          {tbody.length > 0 ? (
            chunkArray(tbody, thead.length).map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                row={row}
                actionPending={actionPending}
                onAction={onActionHandler}
              />
            ))
          ) : (
            <tr className="mt-2 text-center"><td>اطلاعاتی جهت نمایش وجود ندارد</td></tr>
          )}
          <tr className="observer w-1 h-2 opacity-0" ref={loadMoreRef}></tr>
          {isFetchingNextPage && (
            <tr>
              <td>loading ...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default memo(Table);
