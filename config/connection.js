// mysql connection setup

var mysql = require("mysql");

var connection;
if(process.env.JAWSDB_URL) {  
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  //otherwise, we're going to use our local connection!  put your local db set stuff here
  //(and remember our best practice of using the dotenv package and a .env file ;)
  connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "",
    database: "diner"
  });
};



// var connection = mysql.createConnection({
//   host:	"localhost",
//   port:	3306,
//   user:	"root",
//   password: "",
//   database: "diner"
// });

connection.connect(function(err) {
	if (err) {
    console.log(`error connectiong ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`)
});

module.exports = connection;