const IMAGE_RESPONSE = {
  SAVE_SUCCESS: {
    status: "success",
    message: "Image saved successfully.",
  },
  UPDATE_SUCCESS: {
    status: "success",
    message: "Image updated successfully.",
  },
  INVALID_IMAGE_TYPE: {
    status: "error",
    code: "INVALID_IMAGE_TYPE",
    message: "Invalid image type sent.",
  },
  DELETE_SUCCESS: {
    status: "success",
    code: "DELETE_SUCCESS",
    message: "Image deleted successfully.",
  },
  DELETE_ERROR: {
    status: "error",
    code: "DELETE_ERROR",
    message: "Couldnot delete image. Image does not exist for given user.",
  },
  RETRIEVE_SUCCESS: {
    status: "success",
    message: "Image(s) successfully retrieved.",
  },
  RETRIEVE_ERROR: {
    status: "error",
    message:
      "Could not retrieve image, please check your request and try again.",
  },
  INVALID_IMAGE_ID: {
    status: "error",
    message: "Invalid image id received.",
  },
  SAVE_ERROR: {
    status: "error",
    code: "SAVE_ERROR",
    message: "Could not save image. Please try again.",
  },
};

module.exports = {
  IMAGE_RESPONSE,
};
