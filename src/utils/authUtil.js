const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// TODO: Use async functions to hash and verify
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = (password, savedPassword) => {
  return bcrypt.compareSync(password, savedPassword);
};

const getTokenWithExpiry = (payload) => {
  const expiresIn = process.env.JWT_EXPIRES_IN;
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return {
    token,
    expiresIn,
  };
};

const verifyToken = (token) => {
  // Throws an error: Handle in global error handler
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  hashPassword,
  verifyPassword,
  getTokenWithExpiry,
  verifyToken,
};
