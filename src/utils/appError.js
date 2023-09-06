//
class AppError extends Error {
  constructor(status, code, message, httpStatusCode) {
    super(message);
    this.status = status;
    this.code = code;
    this.httpStatusCode = httpStatusCode;
    this.isOperational = true; // other unexcepted errors can be avoided as they wont have isOperational property

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
