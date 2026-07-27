/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Pagination, Skeleton, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Table from "../components/Table/Table";
import UserCard from "../components/UserCard/UserCard";
import { useUsers } from "../hooks/useUsers";

const UsersPage = () => {
  const {
    users,
    isLoading,
    error,
    total,
    page,
    setPage,
    sort,
    setSort,
    setSearch,
  } = useUsers();
  const [selectId, setSelectId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");

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

  const handleChangeSearchString = (event) => {
    const str = event.target.value;

    setSearchString(str);
  };

  const handleClickSearch = () => {
    setSearch(searchString);
  };

  return (
    <div
      style={{
        width: "1400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        gap: 12,
        paddingTop: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "700px",
          gap: "12px",
        }}
      >
        <Input
          placeholder="Поиск по ФИО, возрасту, полу, номеру телефона..."
          onChange={handleChangeSearchString}
        />
        <Button
          icon={<SearchOutlined />}
          type="primary"
          onClick={handleClickSearch}
        >
          Поиск
        </Button>
      </div>

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
