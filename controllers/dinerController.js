// import express
var express = require("express");

// import router
var router = express.Router();

//import diner models
var foodorder = require("../models/foodorder.js");

//Routes

// select all orders and render on home page
router.get("/", function(req,res) {
  // model call to retrieve all the orders
  foodorder.all(function(data) {
    var hbsObject = {
      orders: data
    };
    console.table(data);
    res.render("index", hbsObject);
    // simply render something for testing purposes
    // res.render("index",{greeting: "Hello Word"});
  });
});

// insert one order
router.post("/api/foodorder", function(req,res) {
  foodorder.create(["food_server_id","food_order_name"],
    [req.body.serverId,req.body.orderText],
    function(results) {
      res.json({id: res.insertId});
    });
});


// update an order
router.put("/api/foodorder/:id", function(req,res) {
  var condition = "food_order_id = " + req.params.id;
  console.log(`condition is: ${condition}`);
  foodorder.update(
    {
      is_served: req.body.is_served
    },
    condition,
    function(results) {
      if (results.changedRows === 0) {
        return res.status(404).end();  // id must have been bad if no row updated
      }
      return res.status(200).end();
    });
});

// delete an order
router.delete("/api/foodorder/:id", function(req,res) {
  var condition = "food_order_id = " + req.params.id;
  foodorder.delete(condition, function(result) {
    if (result.affectedRows === 0) {
      return res.status(404).end(); // id must have been bad in no row deleted
    }
    return res.status(200).end();
  });
});

// export routes (make available for server.js)
module.exports = router;