require('dotenv').config()
const Sequelize = require("sequelize");

// const db = new Sequelize(process.env.DATABASE_URL || "postgres:localhost:null//localhost:5432/messenger", {
//   logging: false
// });
const db = new Sequelize('messenger', `postgres`, `wylmlomdns15&`, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;
