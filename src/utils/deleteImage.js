const fs = require("fs");
const s3Storage = require("../config/s3Store");

// Improvements: make a common interface, forcing user to implement save and delete when a new cloud provider/storage option is added

const deleteLocalFileAsync = (filePath) => {
  // Use fs.promises API for async file operations
  fs.promises.unlink(filePath).catch((error) => {
    // Handle error, maybe log it or notify an admin
    console.error(`Error deleting file ${filePath}:`, error);
  });
};

const deleteS3FileAsync = (fileKey) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };

  s3Storage.deleteObject(params, (error) => {
    if (error) {
      // Handle error, maybe log it or notify an admin
      console.error(`Error deleting S3 object ${fileKey}:`, error);
    }
  });
};

// Extend the deletion if other cloud providers are used
const deleteImage = (location) => {
  if (location.startsWith("https://s3.amazonaws.com")) {
    const fileKey = location.split("/").pop(); // Extract S3 key from URL
    deleteS3FileAsync(fileKey);
  } else {
    deleteLocalFileAsync(location);
  }
};

module.exports = {
  deleteImage,
};
