const dotenv = require("dotenv");
const path = require("path");

// Load this before importing app
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const { sequelize, connectToDb } = require("../../src/config/mysqldb");

before(async () => {
  try {
    await connectToDb();
    console.log("Connected to MySQL");
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
  }
});

beforeEach(async () => {
  console.log("running before each clause");
  try {
    await sequelize.sync({ force: true });
    console.log("All tables dropped and recreated");
  } catch (error) {
    console.error("Failed to drop and recreate tables:", error);
  }
});

afterEach(async () => {
  console.log("running after each clause");
  try {
    await sequelize.sync({ force: true });
    console.log("All tables dropped and recreated");
  } catch (error) {
    console.error("Failed to drop and recreate tables:", error);
  }
});

after(async () => {
  console.log("Disconnecting the database");
  await sequelize.close();
});
