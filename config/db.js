const mysql = require('mysql');

console.log("mysql user", process.env.MYSQL_USER);
 
// create a connection variable with the required details
var db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT, 
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_PASSWORD, // corresponding password
  database: process.env.MYSQL_DATABASE, // use the specified database
  multipleStatements: true
});

module.exports = db;