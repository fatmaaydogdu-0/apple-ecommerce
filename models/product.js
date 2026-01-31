const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Product = sequelize.define(
  "product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "category_id",  },
  },
  {
    tableName: "product",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Product;