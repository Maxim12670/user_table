export const getTypeSorting = (currentSort, field) => {
  if (currentSort.field !== field) {
    return {
      field,
      order: "asc",
    };
  }

  if (currentSort.order === "asc") {
    return {
      field,
      order: "desc",
    };
  }

  if (currentSort.order === "desc") {
    return {
      field: null,
      order: null,
    };
  }

  return {
    field,
    order: "asc",
  };
};
