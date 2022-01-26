require('dotenv').config()
const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || 'messenger', `${process.env.PSQL_USER}`, `${process.env.PSQL_PASSWORD}`, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;
