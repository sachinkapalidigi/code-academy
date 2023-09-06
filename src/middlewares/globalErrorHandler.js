const { GENERAL_RESPONSE } = require("../constants/generalResponse");
const {
  LOGIN_RESPONSE: { INVALID_TOKEN, TOKEN_EXPIRED },
} = require("../constants/userResponse");
const AppError = require("../utils/appError");

const handleJsonWebTokenError = () =>
  new AppError(
    INVALID_TOKEN.status,
    INVALID_TOKEN.code,
    INVALID_TOKEN.message,
    401
  );

const handleTokenExpiredError = () =>
  new AppError(
    TOKEN_EXPIRED.status,
    TOKEN_EXPIRED.code,
    TOKEN_EXPIRED.message,
    401
  );

const sendErrorForDev = (err, res) => {
  res.status(err.httpStatusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    code: err.code,
    error: err,
  });
};

const sendErrorForProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.httpStatusCode).json({
      status: err.status,
      message: err.message,
      code: err.code,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    // 1. Log error
    console.error("ERROR", err);
    // 2. Send generic error message
    res.status(500).json(GENERAL_RESPONSE.INTERNAL_SERVER_ERROR);
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.httpStatusCode = err.httpStatusCode || 500;
  err.status = err.status || "error";
  err.code = err.code || "INTERNAL_SERVER_ERROR";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "test"
  ) {
    let error = {
      ...err,
      message: err.message, // spread doesn't copy inherited properties
      name: err.name,
      code: err.code,
      errmsg: err.errmsg,
    };
    // TODO: handle db errors here
    if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError();
    if (error.name === "TokenExpiredError") error = handleTokenExpiredError();
    sendErrorForProd(error, res);
  }
  // this is assumed to be the last error. Call next if it's not.
};

module.exports = globalErrorHandler;
