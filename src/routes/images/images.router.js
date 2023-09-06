const express = require("express");

const imagesRouter = express.Router();

imagesRouter
  .route("/")
  .get(function (req, res) {
    res.status(404).json({ message: "Not implemented" });
  })
  .post(function (req, res) {
    res.status(404).json({ message: "Not implemented" });
  });

imagesRouter
  .route("/:id")
  .get(function (req, res) {
    res.status(404).json({ message: "Not implemented" });
  })
  .put(function (req, res) {
    res.status(404).json({ message: "Not implemented" });
  })
  .delete(function (req, res) {
    res.status(404).json({ message: "Not implemented" });
  });

module.exports = imagesRouter;
