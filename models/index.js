
    
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize'); // ✅ Use DataTypes
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const db = {};

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { host: config.host, dialect: config.dialect }
);

// Read all model files and import them using `require()`
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes); // ✅ Use require()
    db[model.name] = model;
  });

// Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
