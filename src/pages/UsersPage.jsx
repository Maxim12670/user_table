import { useEffect, useState } from "react";
import { Pagination, Skeleton } from "antd";
import Table from "../components/Table/Table";
import UserCard from "../components/UserCard/UserCard";
import { useUsers } from "../hooks/useUsers";
import SearchForm from "../components/SearchForm/SearchForm";

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
      <SearchForm onChange={setSearchString} onClick={handleClickSearch} />

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
