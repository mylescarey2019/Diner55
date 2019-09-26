// mysql connection setup

var mysql = require("mysql");
var connection = mysql.createConnection({
  host:	"localhost",
  port:	3306,
  user:	"root",
  password: "",
  database: "diner"
});

connection.connect(function(err) {
	if (err) {
    console.log(`error connectiong ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`)
});

module.exports = connection;