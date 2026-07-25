import { useState, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./Table.css";

const data = [
  {
    id: 1,
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович",
    age: 28,
    gender: "male",
    phone: "+7 (999) 123-45-67",
    email: "ivanov@mail.ru",
    country: "Россия",
    city: "Москва",
  },
  {
    id: 2,
    surname: "Петрова",
    name: "Анна",
    patronymic: "Петровна",
    age: 32,
    gender: "female",
    phone: "+7 (988) 765-43-21",
    email: "petrova@mail.ru",
    country: "Россия",
    city: "Санкт-Петербург",
  },
  {
    id: 3,
    surname: "Сидоров",
    name: "Алексей",
    patronymic: "Сергеевич",
    age: 45,
    gender: "male",
    phone: "+7 (977) 555-12-34",
    email: "sidorov@mail.ru",
    country: "Россия",
    city: "Новосибирск",
  },
  {
    id: 4,
    surname: "Козлова",
    name: "Екатерина",
    patronymic: "Алексеевна",
    age: 27,
    gender: "female",
    phone: "+7 (916) 333-44-55",
    email: "kozlov@mail.ru",
    country: "Россия",
    city: "Екатеринбург",
  },
  {
    id: 5,
    surname: "Михайлов",
    name: "Дмитрий",
    patronymic: "Михайлович",
    age: 38,
    gender: "male",
    phone: "+7 (903) 777-88-99",
    email: "mikhailov@mail.ru",
    country: "Россия",
    city: "Казань",
  },
];

const Table = ({ users = data }) => {
  const MIN_COLUMN_WIDTH = 50;
  const containerRef = useRef(null);

  // Определение колонок
  const columns = [
    {
      accessorKey: "surname",
      header: "Фамилия",
      size: 150,
    },
    {
      accessorKey: "name",
      header: "Имя",
      size: 150,
    },
    {
      accessorKey: "patronymic",
      header: "Отчество",
      size: 150,
    },
    {
      accessorKey: "age",
      header: "Возраст",
      size: 80,
    },
    {
      accessorKey: "gender",
      header: "Пол",
      size: 80,
      cell: ({ getValue }) => {
        const value = getValue();
        return value === "male" ? "Мужской" : "Женский";
      },
    },
    {
      accessorKey: "phone",
      header: "Номер телефона",
      size: 150,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 200,
    },
    {
      accessorKey: "country",
      header: "Страна",
      size: 150,
    },
    {
      accessorKey: "city",
      header: "Город",
      size: 150,
    },
  ];

  // Состояние для ширины колонок
  const [columnWidths, setColumnWidths] = useState(() => {
    return columns.reduce((acc, col) => {
      acc[col.accessorKey] = col.size;
      return acc;
    }, {});
  });

  // Создаем экземпляр таблицы
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: MIN_COLUMN_WIDTH,
      size: 150,
    },
  });

  // Получение ширины колонки
  const getColumnWidth = (columnId) => {
    return columnWidths[columnId] || 150;
  };

  // Общая ширина таблицы
  const totalWidth = Object.values(columnWidths).reduce((sum, w) => sum + w, 0);
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
                  const width = getColumnWidth(header.column.id);

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
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      <div
                        className="resize-handle"
                        onMouseDown={(e) => {
                          // Сохраняем текущую ширину перед ресайзом
                          const startWidth = width;
                          const startX = e.clientX;

                          const onMouseMove = (moveEvent) => {
                            const deltaX = moveEvent.clientX - startX;
                            const newWidth = Math.max(
                              MIN_COLUMN_WIDTH,
                              startWidth + deltaX,
                            );

                            // Обновляем ширину колонки
                            setColumnWidths((prev) => ({
                              ...prev,
                              [header.column.id]: newWidth,
                            }));
                          };

                          const onMouseUp = () => {
                            document.removeEventListener(
                              "mousemove",
                              onMouseMove,
                            );
                            document.removeEventListener("mouseup", onMouseUp);
                          };

                          document.addEventListener("mousemove", onMouseMove);
                          document.addEventListener("mouseup", onMouseUp);
                        }}
                        onTouchStart={(e) => {
                          const touch = e.touches[0];
                          const startWidth = width;
                          const startX = touch.clientX;

                          const onTouchMove = (moveEvent) => {
                            const touchMove = moveEvent.touches[0];
                            const deltaX = touchMove.clientX - startX;
                            const newWidth = Math.max(
                              MIN_COLUMN_WIDTH,
                              startWidth + deltaX,
                            );

                            setColumnWidths((prev) => ({
                              ...prev,
                              [header.column.id]: newWidth,
                            }));
                          };

                          const onTouchEnd = () => {
                            document.removeEventListener(
                              "touchmove",
                              onTouchMove,
                            );
                            document.removeEventListener(
                              "touchend",
                              onTouchEnd,
                            );
                          };

                          document.addEventListener("touchmove", onTouchMove);
                          document.addEventListener("touchend", onTouchEnd);
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const width = getColumnWidth(cell.column.id);

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
