const joi = require("joi");
const {
  REGISTER_RESPONSE: {
    INVALID_REQUEST,
    INVALID_PASSWORD,
    INVALID_AGE,
    GENDER_REQUIRED,
  },
  LOGIN_RESPONSE: { MISSING_FIELDS },
} = require("../../constants/userResponse");
const { GENERAL_RESPONSE } = require("../../constants/generalResponse");

const createUserSchema = joi.object().keys({
  fullName: joi.string().required(),
  username: joi.string().min(3).max(30).required(),
  password: joi
    .string()
    .min(8)
    .max(100)
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")),
  age: joi.number().greater(0).less(200).required(),
  gender: joi.string().valid("male", "female", "other").required(),
});

const createUserSchemaErrorHandler = (error) => {
  const errorMessage = error.details[0].message;
  const errorType = errorMessage.split(" ")[0];
  let response;

  switch (errorType) {
    case `"fullName"`:
      response = INVALID_REQUEST;
      break;
    case `"username"`:
      response = INVALID_REQUEST;
      break;
    case `"password"`:
      if (error && error._original && !error._original.password) {
        response = INVALID_REQUEST;
      } else {
        response = INVALID_PASSWORD;
      }
      break;
    case `"age"`:
      response = INVALID_AGE;
      break;
    case `"gender"`:
      response = GENDER_REQUIRED;
      break;
    default:
      response = GENERAL_RESPONSE.INVALID_REQUEST;
  }

  return response;
};

const signInSchema = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
});

const signInErrorHandler = (error) => {
  const errorMessage = error.details[0].message;
  const errorType = errorMessage.split(" ")[0];
  let response;

  switch (errorType) {
    case `"username"`:
      response = MISSING_FIELDS;
      break;
    case `"password"`:
      response = MISSING_FIELDS;
      break;
    default:
      response = INVALID_REQUEST;
  }

  return response;
};

module.exports = {
  createUser: {
    schema: createUserSchema,
    errorHandler: createUserSchemaErrorHandler,
  },
  signIn: {
    schema: signInSchema,
    errorHandler: signInErrorHandler,
  },
};
