'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tbl_document_type', [
      {
        documents_type: 'Acknowledgement Copy',
        created_by: 'system',
        created_datetime: new Date(),
        updated_by: 'system',
        updated_datetime: new Date(),
      },
      {
        documents_type: 'PO Copy',
        created_by: 'system',
        created_datetime: new Date(),
        updated_by: 'system',
        updated_datetime: new Date(),
      },
      {
        documents_type: 'Invoice Copy',
        created_by: 'system',
        created_datetime: new Date(),
        updated_by: 'system',
        updated_datetime: new Date(),
      },
      {
        documents_type: 'CA Certified Ledger',
        created_by: 'system',
        created_datetime: new Date(),
        updated_by: 'system',
        updated_datetime: new Date(),
      },
      {
        documents_type: 'Return Cheque Copy',
        created_by: 'system',
        created_datetime: new Date(),
        updated_by: 'system',
        updated_datetime: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tbl_document_type', null, {});
  }
};
