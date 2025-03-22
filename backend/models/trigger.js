const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Trigger extends Model {}

Trigger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    webhook: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "trigger",
  }
);

module.exports = Trigger;
