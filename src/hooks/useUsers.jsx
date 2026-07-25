import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [sort, setSort] = useState({
    field: null,
    order: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getUsers({
          page,
          limit,
          sortBy: sort.field,
          order: sort.order,
        });

        setUsers(data.users);
        setTotal(data.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, sort]);

  return {
    users,
    total,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    sort,
    setSort,
  };
};
