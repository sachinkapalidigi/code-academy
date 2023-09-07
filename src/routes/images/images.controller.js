const catchAsync = require("../../utils/catchAsync");
const Image = require("../../models/images.model");
const {
  IMAGE_RESPONSE: {
    SAVE_SUCCESS,
    RETRIEVE_SUCCESS,
    DELETE_SUCCESS,
    UPDATE_SUCCESS,
  },
} = require("../../constants/imageResponse");
const { getPaginationFields } = require("../../utils/requestTransformers");
const { deleteImage } = require("../../utils/deleteImage");

// IMPROVEMENTS: Move database function calls to a separate service

// Uploading image taken care by middleware
const httpAddImage = catchAsync(async (req, res, next) => {
  const { filename, originalname, mimetype, location, size } = req.file;
  // Save the path to the database
  const image = await Image.create({
    fileName: filename,
    originalName: originalname,
    mimeType: mimetype,
    location,
    size,
    userId: req.user.id,
  });
  return res.status(201).json({
    ...SAVE_SUCCESS,
    data: {
      image: image.toJSON(),
    },
  });
});

const httpGetUserImages = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { skip, limit } = getPaginationFields(req.query);
  // Improvements: Send selected fields
  const images = await Image.findAll({
    where: {
      userId,
    },
    limit,
    offset: skip,
  });
  return res.status(200).json({
    ...RETRIEVE_SUCCESS,
    data: {
      images,
    },
  });
});

// existingImage passed from middleware
const httpGetImage = catchAsync(async (req, res) => {
  return res.status(200).json({
    ...RETRIEVE_SUCCESS,
    data: {
      image: req.existingImage,
    },
  });
});

// Uploading image taken care by middleware
// existingImage passed from middleware
const httpPutImage = catchAsync(async (req, res) => {
  const existingImage = req.existingImage;
  const { filename, originalname, mimetype, location, size } = req.file;

  existingImage.filename = filename;
  existingImage.originalName = originalname;
  existingImage.mimeType = mimetype;
  existingImage.location = location;
  existingImage.size = size;

  await existingImage.save();

  return res.status(200).json({
    ...UPDATE_SUCCESS,
    data: {
      image: existingImage.toJSON(),
    },
  });
});

// Receives existingImage in request from middleware(req.existingImage)
const httpDeleteImage = catchAsync(async (req, res) => {
  // Delete record from DB
  await req.existingImage.destroy();

  // Asynchronously delete the image file
  deleteImage(req.existingImage.location);

  return res.status(200).json({
    ...DELETE_SUCCESS,
  });
});

module.exports = {
  httpAddImage,
  httpGetUserImages,
  httpGetImage,
  httpPutImage,
  httpDeleteImage,
};
