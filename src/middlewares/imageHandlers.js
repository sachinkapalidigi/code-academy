const multer = require("multer");

const storageFactory = require("../utils/storageFactory");
const AppError = require("../utils/appError");
const Image = require("../models/images.model");
const {
  IMAGE_RESPONSE: { SAVE_ERROR, RETRIEVE_ERROR },
} = require("../constants/imageResponse");
const { imageFileFilter } = require("../utils/uploadFilters");

const upload = multer({
  storage: storageFactory(),
  fileFilter: imageFileFilter,
});

const uploadImageMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      next(
        new AppError(
          SAVE_ERROR.status,
          SAVE_ERROR.code,
          SAVE_ERROR.message,
          500
        )
      );
      return;
    }
    next();
  });
};

const findUserImageMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const image = await Image.findOne({
    where: {
      id,
      userId,
    },
  });

  if (!image) {
    next(
      new AppError(
        RETRIEVE_ERROR.status,
        RETRIEVE_ERROR.code,
        RETRIEVE_ERROR.message,
        400
      )
    );
    return;
  }

  req.existingImage = image;
  next();
};

module.exports = {
  uploadImageMiddleware,
  findUserImageMiddleware,
};
