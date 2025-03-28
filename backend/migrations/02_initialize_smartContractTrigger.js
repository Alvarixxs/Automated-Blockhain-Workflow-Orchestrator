const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("smart_contract_triggers", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      sender_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("smart_contract_triggers");
  },
};
