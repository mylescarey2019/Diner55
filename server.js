// server side code
// Server Requires
var express = require("express");
//var path = require("path");

// Set the port of our application for use on Heroku and local 
var PORT = process.env.PORT || 8080;

// instansiate instance of express 
var app = express();

// static file direction
app.use(express.static("public"));

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// the old way before MVC:
// import route file functions and invoke
// note: Routes.js file have exported a function
// that expects app (instance of express) as a parameter
// require('./app/routing/apiRoutes.js')(app);
// require('./app/routing/htmlRoutes.js')(app);

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/dinerController.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});


// this is a kludge to allow for selecting all food_server rows.
// To do this within the MVC model and render on the main page as a handlebars
// partial is beyond scope for this effort and beyond my current knowledge
// will use a direct route call to mysql and render in the order form food server
// select control on page load via /public/diner.js

// If the main route is hit, then we initiate a SQL query to grab all students.
// All of the resulting records are stored in the variable "result."
var connection = require("./config/connection.js");

var query = "SELECT  s.food_server_id \
                    ,s.food_server_name \
              FROM food_server AS s \
          ORDER BY s.food_server_name";

  // routes

  //  get students route
  app.get("/api/foodservers", function(req, res) {
    console.log("in apiRoutes. /api/foodservers");

    connection.query(query, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });