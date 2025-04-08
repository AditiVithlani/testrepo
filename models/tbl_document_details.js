const { DataTypes,Sequelize } = require('sequelize');

module.exports = (sequelize) => {

const tbl_document_details = sequelize.define('tbl_document_details', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    document_url: DataTypes.TEXT,
    is_vender_document: DataTypes.BOOLEAN,
    document_type_id: {
        type: Sequelize.INTEGER,
        onDelete: 'NO ACTION',
        references: {
            model: 'tbl_document_type',
            key: 'id',
        },
},
created_by: DataTypes.STRING(50),
created_datetime: DataTypes.DATE,
updated_by: DataTypes.STRING(50),
updated_datetime: DataTypes.DATE,
  }, {
    tableName: 'tbl_document_details',
    timestamps: false,
  });
  
return tbl_document_details;

};