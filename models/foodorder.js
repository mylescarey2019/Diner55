// import the ORM to be able to interact with the diner database
var orm = require("../config/orm.js");

  // this model function is slightly specialized because
  // i choose add a server table in the database and 
  // and assign a server to an order
  // thus this model functions for all and create are not generic/resusable 
  // in the sense that it cannot retrieve all or create for any table
  //
  //
  // of course with some effort they could be smartened up to handle 
  // a dynamic column postions and foreign key relationship but out of
  // scope for this exercise
  //
  // and true generic methods could be created for select * and insert

var foodorder = {
    all: function(cb) { 
    orm.all("food_order","food_server","food_server_id","food_server_name", function(res) {
      cb(res)
    });
  },
  create: function(cols, vals, cb) {
    orm.create("food_order", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals,condition,cb) {
    orm.update("food_order", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("food_order",condition, function(res) {
      cb(res);
    });
  }
};


// export the database functions so that the controller - dinerController.js can utlize them
module.exports = foodorder;