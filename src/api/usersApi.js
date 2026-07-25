const BASE_URL = "https://dummyjson.com/users";

export const getUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Не удалось получить пользователя");
  }

  return response.json();
};

export const getUsers = async ({
  page = 1,
  limit = 10,
  sortBy = null,
  order = null,
}) => {
  const searchParams = new URLSearchParams();

  searchParams.append("limit", limit);
  searchParams.append("skip", (page - 1) * limit);

  if (sortBy) {
    searchParams.append("sortBy", sortBy);
  }

  if (order) {
    searchParams.append("order", order);
  }

  const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Не удалось получить список пользователей");
  }

  return response.json();
};
