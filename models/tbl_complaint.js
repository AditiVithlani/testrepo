const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const tbl_complaint = sequelize.define('tbl_complaint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    complaint_number: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    gst_no: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mobile_no: DataTypes.STRING(50),
    alternate_mobile_no: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    alternate_email: DataTypes.STRING(50),
    is_vendor: DataTypes.BOOLEAN,
    vender_complain_detail_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tbl_vender_complain_detail', // Ensure this matches the table name in your DB
        key: 'id',
      },
      onDelete: 'NO ACTION',
    },
    company_complain_detail_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tbl_company_complain_detail', // Ensure this matches the table name in your DB
        key: 'id',
      },
      onDelete: 'NO ACTION',
    },
    isClosed: {
      type: DataTypes.BOOLEAN, // ✅ New field
      allowNull: false,
      defaultValue: false, // Default: Complaint is open
    },
    created_by: DataTypes.STRING(50),
    created_datetime: DataTypes.DATE,
    updated_by: DataTypes.STRING(50),
    updated_datetime: DataTypes.DATE,
  },
  {
    tableName: 'tbl_complaint',
    timestamps: false,
  });
  tbl_complaint.associate = (models) => {
    // Vendor Complaint Association
    tbl_complaint.belongsTo(models.tbl_vender_complain_detail, {
      foreignKey: 'vender_complain_detail_id',
      as: 'vendorComplaint',
    });

    // Company Complaint Association
    tbl_complaint.belongsTo(models.tbl_company_complain_detail, {
      foreignKey: 'company_complain_detail_id',
      as: 'companyComplaint',
    });
  };
  return tbl_complaint;
};
