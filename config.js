const mysql = require("mysql");
require("dotenv").config();
const { DB_NAME, DB_PASS, DB_USER, DB_HOST } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});


module.exports = connection;