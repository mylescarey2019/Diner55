// import the ORM to be able to interact with the diner database
var orm = require("../config/orm.js");

var foodorder = {
  all: function(cb) {
    orm.all("food_order", function(res) {
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