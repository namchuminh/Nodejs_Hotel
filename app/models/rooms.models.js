const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Rooms = sequelize.define("rooms", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Avatar: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  People: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  CategoryId: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  Slug: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Status: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
}, {
  tableName: "rooms" 
});

module.exports = Rooms;
