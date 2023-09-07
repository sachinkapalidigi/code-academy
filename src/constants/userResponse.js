const REGISTER_RESPONSE = {
  SUCCESS: {
    status: "success",
    message: "User successfully registered!",
  },
  INVALID_REQUEST: {
    status: "error",
    code: "INVALID_REQUEST",
    message:
      "Invalid request. Please provide all required fields: username, password, fullName.",
  },
  USERNAME_EXISTS: {
    status: "error",
    code: "USERNAME_EXISTS",
    message:
      "The provided username is already taken. Please choose a different username.",
  },
  EMAIL_EXISTS: {
    status: "error",
    code: "EMAIL_EXISTS",
    message:
      "The provided email is already registered. Please use a different email address.",
  },
  INVALID_PASSWORD: {
    status: "error",
    code: "INVALID_PASSWORD",
    message:
      "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
  },
  INVALID_AGE: {
    status: "error",
    code: "INVALID_AGE",
    message: "Invalid age value. Age must be a positive integer.",
  },
  GENDER_REQUIRED: {
    status: "error",
    code: "GENDER_REQUIRED",
    message:
      "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
  },
};

const LOGIN_RESPONSE = {
  SUCCESS: {
    status: "success",
    message: "Access token generated successfully.",
  },
  INVALID_CREDENTIALS: {
    status: "error",
    code: "INVALID_CREDENTIALS",
    message:
      "Invalid credentials. The provided username or password is incorrect.",
  },
  MISSING_FIELDS: {
    status: "error",
    code: "MISSING_FIELDS",
    message: "Missing fields. Please provide both username and password.",
  },
  INVALID_TOKEN: {
    status: "error",
    code: "INVALID_TOKEN",
    message: "Invalid access token provided.",
  },
  TOKEN_EXPIRED: {
    status: "error",
    code: "TOKEN_EXPIRED",
    message: "Access token has expired. Please login again.",
  },
};

module.exports = {
  REGISTER_RESPONSE,
  LOGIN_RESPONSE,
};
