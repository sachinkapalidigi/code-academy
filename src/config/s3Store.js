const AWS = require("aws-sdk");
const uuid = require("uuid");
const multerS3 = require("multer-s3");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3Storage = new AWS.S3();

module.exports = s3Storage;
