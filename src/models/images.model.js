const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");

// NOTE: user_id as foreign key is added automatically by Sequelize as the association is defined in models
const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    meta: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Image;
