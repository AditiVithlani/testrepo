const { DataTypes } = require('sequelize');
const db = require('./index'); // ✅ Import the db object

module.exports = (sequelize) => {
    const tbl_company_complain_detail = sequelize.define('tbl_company_complain_detail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    PO_No: DataTypes.STRING(50),
    payment_mode: DataTypes.STRING(100),
    PO_Date: DataTypes.DATE,
    ack_po_copy_url_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tbl_document_details',
        key: 'id',
      },
      onDelete: 'NO ACTION',
    },
    invoice_no: DataTypes.STRING(50),
    invoice_date: DataTypes.DATE,
    ack_invoice_copy_url_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tbl_document_details',
        key: 'id',
      },
      onDelete: 'NO ACTION',
    },
    ca_certified_ac_ledger_url_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tbl_document_details',
        key: 'id',
      },
      onDelete: 'NO ACTION',
    },
    pending_amout: DataTypes.BIGINT,
    return_cheque_url_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tbl_document_details',
        key: 'id',
      },
      onDelete: 'NO ACTION',
    },
    created_by: DataTypes.STRING(50),
    created_datetime: DataTypes.DATE,
    updated_by: DataTypes.STRING(50),
    updated_datetime: DataTypes.DATE,
  }, {
    tableName: 'tbl_company_complain_detail',
    timestamps: false,
  });
  tbl_company_complain_detail.associate = (models) => {
    tbl_company_complain_detail.hasOne(models.tbl_complaint, {
      foreignKey: 'company_complain_detail_id',
      as: 'complaint',
    });
  };
   return tbl_company_complain_detail;
};
