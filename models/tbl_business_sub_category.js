const { DataTypes } = require('sequelize');
const db = require('./index'); // ✅ Import the db object

module.exports = (sequelize) => {
  const tbl_business_sub_category= sequelize.define('tbl_business_sub_category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    business_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_business_category', // ✅ Ensure this matches your model's table name
        key: 'id',
      },
      onDelete: 'NO ACTION',
    },
    sub_category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: DataTypes.STRING(50),
    created_datetime: DataTypes.DATE,
    updated_by: DataTypes.STRING(50),
    updated_datetime: DataTypes.DATE,
  }, {
    tableName: 'tbl_business_sub_category',
    timestamps: false,
  });
    // Define Association
    tbl_business_sub_category.associate = (models) => {
      tbl_business_sub_category.belongsTo(models.tbl_business_category, {
        foreignKey: 'business_category_id',
        as: 'category', // Alias for Sequelize Query
      });
    };
  
    return tbl_business_sub_category;
  
};
