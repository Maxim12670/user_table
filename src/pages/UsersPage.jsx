/* eslint-disable react-hooks/set-state-in-effect */
import { Pagination, Skeleton } from "antd";
import Table from "../components/Table/Table";
import { useUsers } from "../hooks/useUsers";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard/UserCard";

const UsersPage = () => {
  const { users, isLoading, error, total, page, setPage, sort, setSort } =
    useUsers();
  const [selectId, setSelectId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectId) {
      setIsOpen(true);
    }
  }, [selectId]);

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        {!isLoading ? (
          <Table
            users={users}
            onClick={handleSelectUser}
            sorting={sort}
            onSorting={setSort}
          />
        ) : (
          <Skeleton
            active
            paragraph={{ rows: 14 }}
            title={{ width: "100%" }}
            style={{ width: "100%", height: 491 }}
          />
        )}

        <Pagination
          defaultCurrent={page}
          total={total}
          pageSize={10}
          showSizeChanger={false}
          onChange={setPage}
        />
      </div>

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
