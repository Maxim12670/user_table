export const COLUMNS = [
  {
    accessorKey: "lastName",
    header: "Фамилия",
    size: 150,
  },
  {
    accessorKey: "firstName",
    header: "Имя",
    size: 150,
  },
  {
    accessorKey: "maidenName",
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
    accessorKey: "address.country",
    header: "Страна",
    size: 150,
  },
  {
    accessorKey: "address.city",
    header: "Город",
    size: 150,
  },
];
