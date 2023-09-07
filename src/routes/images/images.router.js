const express = require("express");
const {
  httpGetUserImages,
  httpAddImage,
  httpGetImage,
  httpPutImage,
  httpDeleteImage,
} = require("./images.controller");
const {
  uploadImageMiddleware,
  findUserImageMiddleware,
} = require("../../middlewares/imageHandlers");

const imagesRouter = express.Router();

imagesRouter
  .route("/")
  .get(httpGetUserImages)
  .post(uploadImageMiddleware, httpAddImage);

imagesRouter
  .route("/:id")
  .get(findUserImageMiddleware, httpGetImage)
  .put(findUserImageMiddleware, uploadImageMiddleware, httpPutImage)
  .delete(findUserImageMiddleware, httpDeleteImage);

module.exports = imagesRouter;
