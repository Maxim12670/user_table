import Table from "../components/Table/Table";
import { useUsers } from "../hooks/useUsers";

const UsersPage = () => {
  const { users, loading, error } = useUsers();

  if (loading) {
    return <div>Загрузка пользователей...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки: {error}</div>;
  }

  return (
    <div style={{ width: "1400px", margin: "0 auto" }}>
      <Table users={users} />
    </div>
  );
};

export default UsersPage;
