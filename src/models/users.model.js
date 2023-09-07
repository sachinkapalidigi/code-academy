const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const Image = require("./images.model");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

User.hasMany(Image, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

Image.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

module.exports = User;
