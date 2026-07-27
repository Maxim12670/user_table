import { useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./Table.css";
import { COLUMNS } from "./columns";
import { getTypeSorting } from "./utils/getTypeSorting";

const Table = ({ users, sorting, onClick, onSorting }) => {
  const MIN_COLUMN_WIDTH = 50;
  const containerRef = useRef(null);

  const table = useReactTable({
    data: users,
    manualSorting: true,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    defaultColumn: {
      minSize: MIN_COLUMN_WIDTH,
      size: 150,
    },
  });

  const totalWidth = table
    .getAllColumns()
    .filter((col) => col.getIsVisible())
    .reduce((sum, col) => sum + col.getSize(), 0);

  const containerWidth = containerRef.current?.clientWidth || 0;
  const needsScroll = totalWidth > containerWidth;

  return (
    <div className="table-wrapper">
      <div
        ref={containerRef}
        className={`table-container ${needsScroll ? "has-scroll" : ""}`}
      >
        <table
          className="resizable-table"
          style={{
            width: needsScroll ? `${totalWidth}px` : "100%",
            minWidth: "100%",
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const width = header.getSize();
                  const canSort = header.column.getCanSort();

                  return (
                    <th
                      key={header.id}
                      style={{
                        width: width,
                        minWidth: width,
                        maxWidth: width,
                        position: "relative",
                      }}
                    >
                      <div
                        className="table-header"
                        onClick={() => {
                          if (!canSort) return;

                          onSorting(getTypeSorting(sorting, header.column.id));
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {sorting.field === header.column.id &&
                          (sorting.order === "asc" ? " ▲" : " ▼")}
                      </div>

                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resize-handle ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`}
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          height: "100%",
                          width: "4px",
                          cursor: "col-resize",
                          userSelect: "none",
                          touchAction: "none",
                          backgroundColor: header.column.getIsResizing()
                            ? "#2196f3"
                            : "transparent",
                          transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#2196f3";
                        }}
                        onMouseOut={(e) => {
                          if (!header.column.getIsResizing()) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      />
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} onClick={() => onClick(row.original.id)}>
                {row.getVisibleCells().map((cell) => {
                  const width = cell.column.getSize();

                  return (
                    <td
                      key={cell.id}
                      style={{
                        width: width,
                        minWidth: width,
                        maxWidth: width,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
