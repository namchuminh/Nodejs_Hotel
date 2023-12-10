const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Orders = sequelize.define("orders", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  RoomId : {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  Start: {
    type: DataTypes.DATE,
    allowNull: false
  },
  End: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Total: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  CustomerId: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
}, {
  tableName: "orders" 
});

module.exports = Orders;
