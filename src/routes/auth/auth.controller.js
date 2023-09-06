const User = require("../../models/users.model");
const catchAsync = require("../../utils/catchAsync");
const {
  REGISTER_RESPONSE,
  LOGIN_RESPONSE: { INVALID_CREDENTIALS, SUCCESS },
} = require("../../constants/userResponse");
const {
  hashPassword,
  verifyPassword,
  getTokenWithExpiry,
} = require("../../utils/authUtil");
const AppError = require("../../utils/appError");

const httpCreateUser = catchAsync(async (req, res) => {
  const { password, username, fullName, age, gender } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({
    where: {
      username,
    },
  });

  if (existingUser) {
    const { status, code, message } = REGISTER_RESPONSE.USERNAME_EXISTS;
    throw new AppError(status, code, message, 400);
  }

  const newUser = await User.create({
    username,
    password: hashPassword(password),
    fullName,
    gender,
    age,
  });
  return res.status(201).json({
    ...REGISTER_RESPONSE.SUCCESS,
    data: {
      userId: newUser.id,
      username: newUser.username,
      fullName: newUser.fullName,
      age: newUser.age,
      gender: newUser.gender,
    },
  });
});

const httpGetToken = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user || !verifyPassword(password, user.password)) {
    const { status, code, message } = INVALID_CREDENTIALS;
    throw new AppError(status, code, message, 400);
  }
  const { token, expiresIn } = getTokenWithExpiry({ id: user.id });
  return res.status(200).json({
    ...SUCCESS,
    data: {
      accessToken: token,
      expiresIn: expiresIn,
    },
  });
});

module.exports = {
  httpCreateUser,
  httpGetToken,
};
