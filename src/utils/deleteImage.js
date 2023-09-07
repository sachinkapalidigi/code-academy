const fs = require("fs");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3Storage = require("../config/s3Store");

// Improvements: make a common interface, forcing user to implement save and delete when a new cloud provider/storage option is added

const deleteLocalFileAsync = (filePath) => {
  // Use fs.promises API for async file operations
  fs.promises.unlink(filePath).catch((error) => {
    // Handle error, maybe log it or notify an admin
    console.error(`Error deleting file ${filePath}:`, error);
  });
};

const deleteS3FileAsync = async (fileKey) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };
  try {
    await s3Storage.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error(`Error deleting file ${fileKey}:`, error);
  }
};

// Extend the deletion if other cloud providers are used
const deleteImage = (location) => {
  if (location.includes("amazonaws.com")) {
    const fileKey = location.split("/").pop(); // Extract S3 key from URL
    deleteS3FileAsync(fileKey);
  } else {
    deleteLocalFileAsync(location);
  }
};

module.exports = {
  deleteImage,
};
