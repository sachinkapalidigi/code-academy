const { GENERAL_RESPONSE } = require("../constants/generalResponse");

const requestValidator = (schema, rvt = "body", errorHandler) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[rvt]);
    if (error) {
      if (errorHandler) {
        return res.status(400).json(errorHandler(error));
      }
      return res.status(400).json(GENERAL_RESPONSE.INVALID_REQUEST);
    }
    return next();
  };
};

module.exports = requestValidator;
