const User = require("../models/users.model"); //
const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/authUtil");
const catchAsync = require("../utils/catchAsync");
const {
  LOGIN_RESPONSE: { INVALID_TOKEN },
} = require("../constants/userResponse");

const protectRoute = catchAsync(async (req, res, next) => {
  // 1. Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError(
        INVALID_TOKEN.status,
        INVALID_TOKEN.code,
        INVALID_TOKEN.message,
        401
      )
    );
  }
  // 2. Verification of token: throws exception if token is invalid
  const decoded = verifyToken(token);
  // 3. Check if user still exists
  const currUser = await User.findByPk(decoded.id);
  if (!currUser) {
    // The token belonging to this user does no longer exist
    return next(
      new AppError(
        INVALID_TOKEN.status,
        INVALID_TOKEN.code,
        INVALID_TOKEN.message,
        401
      )
    );
  }

  // Grant access to protected route
  req.user = currUser;
  next();
});

module.exports = {
  protectRoute,
};
