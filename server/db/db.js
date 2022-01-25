require('dotenv').config()
const Sequelize = require("sequelize");

// const db = new Sequelize(process.env.DATABASE_URL || "postgres:localhost:null//localhost:5432/messenger", {
//   logging: false
// });
const db = new Sequelize('messenger', `${process.env.PSQL_USER}`, `${process.env.PSQL_PASSWORD}`, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;
