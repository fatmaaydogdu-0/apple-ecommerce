const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Category = sequelize.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Category;