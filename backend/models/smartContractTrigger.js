const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class SmartContractTrigger extends Model {}

SmartContractTrigger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "smartContractTrigger",
  }
);

module.exports = SmartContractTrigger;
