// ORM (object relation mapping) setup

var connection = require("./connection.js");


// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// SELECT food_order.*, food_server.food_server_name
//   FROM food_order 
//   JOIN food_server 
//     ON food_order.food_server_id = food_server.food_server_id
//  ORDER BY food_server.food_server_name, food_order.food_order_id

//define the Object Relational Mapper (ORM) object and its methods then export
var orm = {
  // select all from table - this is specific for food_order table so not 
  // fully taking advantage of orm concept
  // because it has foreign key join to food_server table
  // did not have time to bite off effort to make a mutli-table select
  // fully dynamic & resusable
  all: function(tableName,tableName2,foreignKey,foreignKeyNameCol,cb) {
    var query = "SELECT " + tableName + ".*,";
    query += tableName2 + "." + foreignKeyNameCol;
    query += " FROM " + tableName + " JOIN " + tableName2;
    query += " ON " + tableName + "." + foreignKey + " = ";
    query += tableName2  + "." + foreignKey;
    query += " ORDER BY " + tableName2 + "." + foreignKeyNameCol;
    query += " ," + tableName + "." + foreignKey ;
    console.log(`QUERY: ${query}`);
    connection.query(query,[tableName], function(err,result) {
      if (err) {
        throw err;
      } 
      cb(result);
    });
  },
  // insert row into table
  create: function(tableName, cols, vals, cb) {
    var query = "INSERT INTO " + tableName;
    query += " (";
    query += cols.toString();
    query += ") ";
    query += "VALUES (";
    query += printQuestionMarks(vals.length);
    query += ") ";

    console.log(query);
    connedction.query(query, vals, function(err,result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // update row - note objColVals look like:  (food_order_name: blt, is_served: false)
  update: function(tableName, objColVals, condition, cb) {
    var query = "UPDATE " + tableName;
    query += " SET ";
    query += objToSql(objColVals);
    query += " WHERE ";
    query += condition;

    console.log(query);
    connection.query(query,function(err,result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // delete row
  delete: function(tableName,condition,cb) {
    var query = "DELETE FROM " + tableName;
    query += " WHERE ";
    query += condition;
    console.log(`DELETING A ROW ${query}`);
    connection.query(query,function(err,result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;