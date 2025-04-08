
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const tbl_Company_detail = sequelize.define('tbl_Company_detail', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    gst_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_sub_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tbl_business_sub_category', // Should match the actual table name
        key: 'id',
      },
      onDelete: 'NO ACTION',
    },
    created_by: DataTypes.STRING(50),
    created_datetime: DataTypes.DATE,
    updated_by: DataTypes.STRING(50),
    updated_datetime: DataTypes.DATE,
  },
  {
    tableName: 'tbl_Company_detail',
    timestamps: false,
  });

  return tbl_Company_detail;
};

