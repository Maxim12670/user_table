export const COLUMNS = [
  {
    accessorKey: "lastName",
    header: "Фамилия",
    size: 150,
    enableSorting: true,
  },
  {
    accessorKey: "firstName",
    header: "Имя",
    size: 150,
    enableSorting: true,
  },
  {
    accessorKey: "maidenName",
    header: "Отчество",
    size: 150,
    enableSorting: true,
  },
  {
    accessorKey: "age",
    header: "Возраст",
    size: 80,
    enableSorting: true,
  },
  {
    accessorKey: "gender",
    header: "Пол",
    size: 80,
    cell: ({ getValue }) => {
      const value = getValue();
      return value === "male" ? "Мужской" : "Женский";
    },
    enableSorting: true,
  },
  {
    accessorKey: "phone",
    header: "Номер телефона",
    size: 150,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
    enableSorting: false,
  },
  {
    accessorKey: "address.country",
    header: "Страна",
    size: 150,
    enableSorting: false,
  },
  {
    accessorKey: "address.city",
    header: "Город",
    size: 150,
    enableSorting: false,
  },
];
