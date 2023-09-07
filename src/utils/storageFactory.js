const uuid = require("uuid");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const fs = require("fs");

const s3Storage = require("../config/s3Store");

const getFileName = (fileName) => uuid.v4().toString() + "-" + fileName;

const getS3Storage = () =>
  multerS3({
    s3: s3Storage,
    bucket: process.env.AWS_BUCKET_NAME,
    // acl: "public-read", // change this if private access is necessary: use only if acl is allowed for buckets
    key: function (req, file, cb) {
      const fname = getFileName(file.originalname);
      file.filename = fname;
      cb(null, fname);
    },
  });

const getDiskStorage = () => {
  const DISK_PATH =
    process.env.STORAGE_DISK_PATH || path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(DISK_PATH)) {
    console.log("Creating uploads directory...");
    fs.mkdirSync(DISK_PATH, { recursive: true });
  }
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DISK_PATH);
    },
    filename: function (req, file, cb) {
      const fname = getFileName(file.originalname);
      file.location = path.join(DISK_PATH, fname);
      cb(null, fname);
    },
  });
};

const storageFactory = () => {
  const STORAGE_TYPE = process.env.STORAGE_TYPE || "DISK";
  switch (STORAGE_TYPE) {
    case "S3":
      return getS3Storage();
    case "DISK":
      return getDiskStorage();
    default:
      throw new Error("Invalid STORAGE_TYPE environment variable set.");
  }
};

module.exports = storageFactory;
