# Diner 55

## Database Schema and SQL Queries

```mysql
CREATE DATABASE `diner` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;


CREATE TABLE `food_server` (
  `food_server_id` int(11) NOT NULL AUTO_INCREMENT,
  `food_server_name` varchar(50) NOT NULL,
  PRIMARY KEY (`food_server_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `food_order` (
  `food_order_id` int(11) NOT NULL AUTO_INCREMENT,
  `food_server_id` int(11) NOT NULL,
  `food_order_name` varchar(200) NOT NULL,
  `is_served` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`food_order_id`),
  KEY `FK_food_order_food_server` (`food_server_id`),
  CONSTRAINT `FK_food_order_food_server` FOREIGN KEY (`food_server_id`) REFERENCES `food_server` (`food_server_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- insert server
INSERT INTO food_server (food_server_name)
VALUES('Logan'),
      ('Ella'),
      ('Nathan'),
      ('Brittney'),
      ('Zach'),
      ('Sara'),
      ('Leah');
      
-- insert food orders
INSERT INTO food_order (food_server_id,food_order_name)
VALUES (1,"BLT"),
       (1,"Turkey Club"),
       (2,"Calzone"),
       (4,"Tomato Soup"),
       (4,"Roast Beef with fries"),
       (5,"Cheesburger no onions");
```



- CRUD SQL Statements

``` js
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
    connection.query(query, vals, function(err,result) {
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
    
    
    var query = "SELECT  s.food_server_id \
                    ,s.food_server_name \
              FROM food_server AS s \
          ORDER BY s.food_server_name";

```

