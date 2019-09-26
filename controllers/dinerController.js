// import express
var express = require("express");

// import router
var router = express.Router();

//Routes

// select all orders and render on home page
router.get("/", function(req,res) {
  // here is where a model call for ALL might go
  // simply render something for testing purposes
  res.render("index",{greeting: "Hello Word"});
});


// insert one order
router.post("/api/diner", function(req,res) {
  diner.create([
    //column name array
  ],
  [
    //column value array
  ], function(results) {
    res.json(res.insertId);
  });
});


// update an order
router.put("/api/diner/:id", function(req,res) {
  
});


// export routes (make available for server.js)
module.exports = router;