const GENERAL_RESPONSE = {
  INVALID_REQUEST: {
    status: "error",
    code: "INVALID_REQUEST",
    message: "Invalid request. Please check the input and try again.",
  },
  INTERNAL_SERVER_ERROR: {
    status: "error",
    code: "INTERNAL_SERVER_ERROR",
    message: "An internal server error occurred. Please try again later.",
  },
  ROUTE_NOT_FOUND: {
    status: "error",
    code: "ROUTE_NOT_FOUND",
    message: "Requested route does not exist.",
  },
};

module.exports = {
  GENERAL_RESPONSE,
};
