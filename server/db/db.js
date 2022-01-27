require('dotenv').config()
const Sequelize = require("sequelize");

const db = new Sequelize(`${process.env.PSQL_DATABASE}`, `${process.env.PSQL_USER}`, `${process.env.PSQL_PASSWORD}`, {
  host: `${process.env.PSQL_HOST}`,
  dialect: 'postgres'
});

module.exports = db;
