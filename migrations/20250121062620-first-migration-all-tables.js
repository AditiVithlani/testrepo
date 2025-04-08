'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_business_category
    await queryInterface.createTable('tbl_business_category', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });

    // tbl_business_sub_category
    await queryInterface.createTable('tbl_business_sub_category', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      business_category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_business_category',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      sub_category_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });

    // tbl_Company_detail
    await queryInterface.createTable('tbl_Company_detail', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      gst_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      business_sub_category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_business_sub_category',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });

    // tbl_document_type
    await queryInterface.createTable('tbl_document_type', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      documents_type: Sequelize.STRING,
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });

    // tbl_document_details
    await queryInterface.createTable('tbl_document_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      document_url: Sequelize.TEXT,
      is_vender_document: Sequelize.BOOLEAN,
      document_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_document_type',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });

    // tbl_payment_modes
    await queryInterface.createTable('tbl_payment_modes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      payment_mode: Sequelize.STRING(50),
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });

    // tbl_company_complain_detail
    await queryInterface.createTable('tbl_company_complain_detail', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      PO_No: Sequelize.STRING(50),
      PO_Date: Sequelize.DATE,
      ack_po_copy_url_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_document_details',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      invoice_no: Sequelize.STRING(50),
      invoice_date: Sequelize.DATE,
      ack_invoice_copy_url_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_document_details',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      payment_mode_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_payment_modes',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      ca_certified_ac_ledger_url_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_document_details',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      pending_amout: Sequelize.BIGINT,
      return_cheque_url_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_document_details',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });

    // tbl_vender_complain_detail
    await queryInterface.createTable('tbl_vender_complain_detail', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Proforma_Invoice_No: Sequelize.STRING(50),
      Proforma_Invoice_Date: Sequelize.DATE,
      ack_copy_url_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_document_details',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });

    // tbl_complaint
    await queryInterface.createTable('tbl_complaint', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      complaint_number: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      gst_no: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      mobile_no: Sequelize.STRING(50),
      alternate_mobile_no: Sequelize.STRING(50),
      email: Sequelize.STRING(50),
      alternate_email: Sequelize.STRING(50),
      is_vendor: Sequelize.BOOLEAN,
      vender_complain_detail_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_vender_complain_detail',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      company_complain_detail_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_company_complain_detail',
          key: 'id',
        },
        onDelete: 'NO ACTION',
      },
      created_by: Sequelize.STRING(50),
      created_datetime: Sequelize.DATE,
      updated_by: Sequelize.STRING(50),
      updated_datetime: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order to avoid dependency conflicts
    await queryInterface.dropTable('tbl_complaint');
    await queryInterface.dropTable('tbl_vender_complain_detail');
    await queryInterface.dropTable('tbl_company_complain_detail');
    await queryInterface.dropTable('tbl_payment_modes');
    await queryInterface.dropTable('tbl_document_details');
    await queryInterface.dropTable('tbl_document_type');
    await queryInterface.dropTable('tbl_Company_detail');
    await queryInterface.dropTable('tbl_business_sub_category');
    await queryInterface.dropTable('tbl_business_category');
  },
};
