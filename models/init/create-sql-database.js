require('dotenv').config()

const Importer = require('mysql-import');

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

// console.log('user', user)

const importer = new Importer({host, user, password, database});

importer.import(__dirname + '/db.sql').then(()=>{
  var files_imported = importer.getImported();
  console.log(`${files_imported.length} SQL file(s) imported.`);
}).catch(err=>{
  console.error(err);
});


// require('dotenv').config()

// var execsql = require('execsql'),
//   dbConfig = {
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     // password: process.env.MYSQL_PASSWORD
//   },
//   // sql = 'use ' + process.env.MYSQL_DATABASE + ';',
//   sqlFile = __dirname + '/db.sql';
//   console.log('host: ',process.env.MYSQL_HOST )
// execsql.config(dbConfig)
//   // .exec(sql)
//   .execFile(sqlFile, function (err, results) {
//     console.log(err);
//   }).end();


// // from https://stackoverflow.com/questions/22276763/use-nodejs-to-run-an-sql-file-in-mysql
// // with modifications
// require('dotenv').config()
// var mysql = require('mysql');
// var fs = require('fs');
// var readline = require('readline');
// var myCon = mysql.createConnection({
//    host: process.env.MYSQL_HOST,
//    port: process.env.MYSQL_PORT,
//    database: process.env.MYSQL_DATABASE,
//    user: process.env.MYSQL_USER,
//   //  password: process.env.MYSQL_PASSWORD
// });
// var rl = readline.createInterface({
//   input: fs.createReadStream(__dirname + '/db.sql'),
//   terminal: false
//  });
// rl.on('line', function(chunk){
//     myCon.query(chunk.toString('ascii'), function(err, sets, fields){
//      if(err) console.log(err);
//     });
// });
// rl.on('close', function(){
//   console.log("finished");
//   myCon.end();
// });