const { IMAGE_RESPONSE } = require("../constants/imageResponse");
const AppError = require("./appError");

const imageFileFilter = (req, file, cb) => {
  // Check for image mime types
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    const { status, code, message } = IMAGE_RESPONSE.INVALID_IMAGE_TYPE;
    cb(new AppError(status, code, message, 400), false); // Reject the file
  }
};

module.exports = {
  imageFileFilter,
};
