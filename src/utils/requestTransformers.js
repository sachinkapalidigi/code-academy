function getPaginationFields(queryString) {
  const page = queryString.page * 1 || 1;
  const limit = queryString.limit * 1 || 10;
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
  };
}

module.exports = {
  getPaginationFields,
};
