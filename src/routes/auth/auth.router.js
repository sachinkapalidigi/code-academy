const express = require("express");
const { httpCreateUser, httpGetToken } = require("./auth.controller");
const requestValidator = require("../../middlewares/requestValidator");
const { createUser, signIn } = require("./auth.validation");

const authRouter = express.Router();

authRouter.post(
  "/register",
  requestValidator(createUser.schema, "body", createUser.errorHandler),
  httpCreateUser
);

authRouter.post(
  "/login",
  requestValidator(signIn.schema, "body", signIn.errorHandler),
  httpGetToken
);

module.exports = authRouter;
