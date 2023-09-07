const { S3Client } = require("@aws-sdk/client-s3");

const config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
};

const s3Storage = new S3Client(config);

module.exports = s3Storage;
