const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  '',
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
);

const db = {};

db.Sequelize = Sequelize,
db.sequelize = sequelize,

db.biodata = require('./biodata.model')(sequelize, Sequelize);

module.exports = db;
