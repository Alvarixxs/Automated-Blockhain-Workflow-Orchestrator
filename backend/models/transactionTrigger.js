const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class TransactionTrigger extends Model {}

TransactionTrigger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.TEXT,
    },
    receiverId: {
      type: DataTypes.TEXT,
    },
    minQubic: {
      type: DataTypes.INTEGER,
    },
    maxQubic: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "transactionTrigger",
  }
);

module.exports = TransactionTrigger;
