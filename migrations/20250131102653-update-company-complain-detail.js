'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove old foreign key column
    await queryInterface.removeColumn('tbl_company_complain_detail', 'payment_mode_id');

    // Add new payment_mode column as a string
    await queryInterface.addColumn('tbl_company_complain_detail', 'payment_mode', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Drop tbl_payment_modes table
    await queryInterface.dropTable('tbl_payment_modes');
  },

  down: async (queryInterface, Sequelize) => {
    // Recreate tbl_payment_modes table
    await queryInterface.createTable('tbl_payment_modes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      payment_mode: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });

    // Add back payment_mode_id column with foreign key
    await queryInterface.addColumn('tbl_company_complain_detail', 'payment_mode_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'tbl_payment_modes',
        key: 'id'
      },
      onDelete: 'SET NULL',
      allowNull: true
    });

    // Remove payment_mode column
    await queryInterface.removeColumn('tbl_company_complain_detail', 'payment_mode');
  }
};
