/* eslint-disable react-hooks/set-state-in-effect */
import { Pagination } from "antd";
import Table from "../components/Table/Table";
import { useUsers } from "../hooks/useUsers";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard/UserCard";

const UsersPage = () => {
  const { users, isLoading, error, total, page, setPage } = useUsers();
  const [selectId, setSelectId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectId) {
      setIsOpen(true);
    }
  }, [selectId]);

  if (isLoading) {
    return <div>Загрузка пользователей...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки: {error}</div>;
  }

  const handleSelectUser = (userId) => {
    setSelectId(userId);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectId(null);
  };

  return (
    <div style={{ width: "1400px", margin: "0 auto" }}>
      <Table users={users} onClick={handleSelectUser} />
      <Pagination
        defaultCurrent={page}
        total={total}
        pageSize={10}
        showSizeChanger={false}
        onChange={setPage}
      />

      {selectId && (
        <UserCard
          userId={selectId}
          isShow={isOpen}
          onClick={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UsersPage;
