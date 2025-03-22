const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("transaction_triggers", {
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
      min_qubic: {
        type: DataTypes.INTEGER,
      },
      max_qubic: {
        type: DataTypes.INTEGER,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("transaction_triggers");
  },
};
