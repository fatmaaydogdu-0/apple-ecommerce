const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const User = sequelize.define(
  "user",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = User;