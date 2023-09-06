const Sequelize = require("sequelize");

const DATABASE = process.env.DATABASE || "";
const USERNAME = process.env.DATABASE_USERNAME || "";
const PASSWORD = process.env.DATABASE_PASSWORD || "";
const HOST = process.env.DATABASE_HOST || "";

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  dialect: "mysql",
  host: HOST,
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    idle: 10000, // Time (in milliseconds) that a connection can be idle before being removed from the pool
  },
});

const connectToDb = async function () {
  console.log("Connecting to database");
  await sequelize.authenticate();
  console.log("Successfully connected to database");
};

// USE sequelize-cli instead of this
const syncDb = async function (alter = false) {
  try {
    await sequelize.sync({ alter });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

module.exports = {
  sequelize,
  connectToDb,
  syncDb,
};
