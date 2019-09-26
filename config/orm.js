// ORM (object relation mapping) setup

var connection = require("./connection.js");

//define the ORM object and its methods then export

var orm = {
  // select all
  selectAll: function(tableName) {
    var query = "SELECT * FROM ?? ORDER BY ?? ";
    connection.query(query,[tableName,orderByColumn], function(err,result) {
      if (err) throw err;
      console.log(results);
    });
  }  
  // },

//   // insert one 
//   insertOne: function(tableName,) {
//     var query = "SELECT * FROM ?? ORDER BY ?? ";
//     connection.query(query,[tableName,orderByColumn], function(err,result) {
//       if (err) throw err;
//       console.log(results);
//     });
//   },

// // update one

// };

};

module.exports = orm;