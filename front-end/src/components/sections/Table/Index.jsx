import { memo } from "react";
import TableRow from "./TableRow";

function Table({ thead, tbody , scroll , onAction , actionPending }) {
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const onActionHandler = (id , action)=>{
    onAction(id , action)
  }
  return (
    <div className={`relative flex flex-col w-full ${scroll ? "lg:h-[330px] h-[230px] overflow-y-auto" : "overflow-y-hidden h-auto"} text-gray-700 bg-white shadow-md rounded-lg bg-clip-border`}>
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
          {chunkArray(tbody, thead.length).map((row, rowIndex) => (
            <TableRow key={rowIndex} row={row} actionPending={actionPending} onAction={onActionHandler} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(Table);
