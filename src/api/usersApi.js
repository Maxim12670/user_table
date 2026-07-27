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
  search = "",
  sortBy = null,
  order = null,
}) => {
  const params = new URLSearchParams();

  params.append("limit", limit);
  params.append("skip", (page - 1) * limit);

  if (sortBy) {
    params.append("sortBy", sortBy);
  }

  if (order) {
    params.append("order", order);
  }

  const endpoint = search.trim() ? `${BASE_URL}/search` : BASE_URL;

  if (search.trim()) {
    params.append("q", search.trim());
  }

  const response = await fetch(`${endpoint}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Не удалось получить список пользователей");
  }

  return response.json();
};
