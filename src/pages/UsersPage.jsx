import { useEffect, useState } from "react";
import { Pagination, Skeleton } from "antd";
import Table from "../components/Table/Table";
import UserCard from "../components/UserCard/UserCard";
import { useUsers } from "../hooks/useUsers";
import SearchForm from "../components/SearchForm/SearchForm";
import ErrorView from "../components/ErrorView/ErrorView";
import style from "./UserPage.module.css";

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
    return (
      <div className={style.page__error}>
        <ErrorView message={error} />
      </div>
    );
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
    <div className={style.page}>
      <SearchForm onChange={setSearchString} onClick={handleClickSearch} />

      <div className={style.page__container}>
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
