var express = require("express");

var app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));

//INDEX ROUTE
app.get("/", function(req,res){
  res.redirect("/gascalc/new");
});

//CREATE ROUTE - Calculator Page
app.get("/gascalc/new", function(req,res){
  res.render("calculatorPage");
});

// Tell Express to listen for requests on port 3000 (starts server)
app.listen(3000, function () {
  //Logs "Server has started" to the console when server has been started
  console.log("Server has started");
});
