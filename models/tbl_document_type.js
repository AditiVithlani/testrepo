const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

const tbl_document_type = sequelize.define('tbl_document_type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    documents_type: DataTypes.STRING, // Use `DataTypes.TEXT` if very large
    created_by: DataTypes.STRING(50),
    created_datetime: DataTypes.DATE,
    updated_by: DataTypes.STRING(50),
    updated_datetime: DataTypes.DATE,
  }, {
    tableName: 'tbl_document_type',
    timestamps: false,
  });
  return tbl_document_type
};
  