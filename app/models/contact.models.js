const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Contact = sequelize.define("contact", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CustomerId: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  Message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: "contact" 
});

module.exports = Contact;
