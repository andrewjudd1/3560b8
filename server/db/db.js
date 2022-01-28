require('dotenv').config()
const Sequelize = require("sequelize");

// const db = new Sequelize(process.env.DATABASE_URL || "postgres:localhost:null//localhost:5432/messenger", {
//   logging: false
// });
// const db = new Sequelize('postgres', `postgres`, `now3ef239vlkn`, {
//   host: 'localhost',
//   dialect: 'postgres'
// });
const db = new Sequelize(`${process.env.PSQL_DATABASE}`, `${process.env.PSQL_USER}`, `${process.env.PSQL_PASSWORD}`, {
  host: `${process.env.PSQL_HOST}`,
  dialect: 'postgres'
});

module.exports = db;
