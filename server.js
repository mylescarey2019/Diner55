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
