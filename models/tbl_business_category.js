const { DataTypes } = require('sequelize');
const db = require('./index'); // ✅ Import the `db` object

module.exports = (sequelize) => {
  const tbl_business_category=  sequelize.define('tbl_business_category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    created_by: DataTypes.STRING(50),
    created_datetime: DataTypes.DATE,
    updated_by: DataTypes.STRING(50),
    updated_datetime: DataTypes.DATE,
  }, {
    tableName: 'tbl_business_category',
    timestamps: false, 
  });
    // Define Association
    tbl_business_category.associate = (models) => {
      tbl_business_category.hasMany(models.tbl_business_sub_category, {
        foreignKey: 'business_category_id',
        as: 'subcategories',
      });
    };
  
    return tbl_business_category;
  
};
