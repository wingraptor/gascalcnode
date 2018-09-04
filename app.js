var bodyParser = require("body-parser"),
  express = require("express");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//INDEX ROUTE
app.get("/", function(req, res) {
  res.redirect("/gascalc/new");
});

//CREATE ROUTE - Calculator Page
app.get("/gascalc/new", function(req, res) {
  res.render("calculatorPage");
});

//CREATE ROUTE - Calculator Page
app.post("/gascalc", function(req, res) {
  res.render("calculatorPage");
});

//HISTORICAL PRICES PAGE
app.get("/historical", function(req, res) {
  res.render("historical");
});

//FUEL SAVING TIPS PAGE
app.get("/tips", function(req, res) {
  res.render("tips");
});

// Tell Express to listen for requests on port 3000 (starts server)
app.listen(3000, function() {
  //Logs "Server has started" to the console when server has been started
  console.log("Server has started");
});
