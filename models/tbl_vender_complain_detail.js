const { DataTypes,Sequelize } = require('sequelize');
module.exports = (sequelize) => {

const tbl_vender_complain_detail = sequelize.define('tbl_vender_complain_detail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Proforma_Invoice_No: DataTypes.STRING(50),
    Proforma_Invoice_Date: DataTypes.DATE,
    ack_copy_url_id: {
        type: Sequelize.INTEGER,
        onDelete: 'NO ACTION',
        references: {
            model: 'tbl_document_details',
            key: 'id',
        },
},
created_by: DataTypes.STRING(50),
    created_datetime: DataTypes.DATE,
    updated_by: DataTypes.STRING(50),
    updated_datetime: DataTypes.DATE,
  }, {
    tableName: 'tbl_vender_complain_detail',
    timestamps: false,
  });
    // Define Associations
    tbl_vender_complain_detail.associate = (models) => {
      tbl_vender_complain_detail.hasOne(models.tbl_complaint, {
        foreignKey: 'vender_complain_detail_id',
        as: 'complaint',
      });
    };
return tbl_vender_complain_detail;
};  