var moment = require("moment"),
  bodyParser = require("body-parser"),
  // mongoose = require("mongoose"),
  express = require("express");

var app = express();
// mongoose.connect(
//   "mongodb://localhost:27017/gascalc_app",
//   { useNewUrlParser: true }
// );

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//Allow favicon to served to website
app.use("/favicon.ico", express.static("public/favicon.ico"));

var userInputs = [];

var port = process.env.PORT || 3000;
var IP = process.env.IP ||"";

//Constructor for outputs from calculation functions
function Outputs(taxOutputs, fuelCostOutputs, fuelUsageOutputs) {
  (this.taxes = taxOutputs),
    (this.fuelCosts = fuelCostOutputs),
    (this.fuelUsages = fuelUsageOutputs);
}

//==================
// DATABASE CREATION
//==================

// Pretaxprice.create({
//   petrol: [2.85, 2.93, 2.85, 2.82, 2.91, 2.84, 2.91, 2.78, 2.98, 2.96, 2.97,
//     3, 3.18, 2.94, 3.16, 3.25, 3.38, 3.19, 3.27, 3.35, 3.29, 3.44, 3.31,
//     3.40, 3.60],
//   diesel: [1.99, 2.07, 2.04, 1.95, 2.09, 2.07, 2.12, 2.15, 2.17, 2.21, 2.28,
//     2.15, 2.13, 2.37, 2.35, 2.46, 2.37, 2.52, 2.58, 2.63, 2.60, 2.60,
//     2.61, 2.80]
// }, function(err,Pretaxprices){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(Pretaxprices);
//   }
// });

//==============
// ROUTES CONFIG
//==============

//INDEX ROUTE
app.get("/", function(req, res) {
  res.redirect("/gascalc/new");
});

//NEW ROUTE - Calculator Page
app.get("/gascalc/new", function(req, res) {
  // Set length array of userinputs to 0; clear user array
  userInputs = [];
  res.render("calculatorPage");
});

//CREATE ROUTE - Calculator Page
app.post("/gascalc", function(req, res) {
  // Capture and store user inputs
  var newUserInputs = {
    fuelEfficiency: parseFloat(req.body.fuelEfficiency),
    odometerReading: parseFloat(req.body.odometerReading),
    vehicleAge: parseFloat(req.body.vehicleAge),
    fuelType: req.body.fuelType
  };

  userInputs.push(newUserInputs);
  res.redirect("/gascalc/results");
});

//SHOW ROUTE - Calculator Results Page
app.get("/gascalc/results", function(req, res) {
  // Group outputs from calculation functions in 3 different objects
  let taxOutputs = {
      yearly: yearlyFuelTaxes(),
      monthly: monthlyFuelTaxes(),
      per100km: taxesPer100Km()
    },
    fuelCostOutputs = {
      yearly: fuelCalculator(yearlyFuelUsage, avgFuelRate),
      monthly: fuelCalculator(monthlyFuelUsage, avgFuelRate),
      currentYearly: fuelCalculator(yearlyFuelUsage, "current"),
      currentMonthly: fuelCalculator(monthlyFuelUsage, "current")
    },
    fuelUsageOutputs = {
      total: totalFuelUsed(),
      monthly: monthlyFuelUsage(),
      yearly: yearlyFuelUsage()
    };

  //Create object from the 3 grouped output objects declared above
  let outputs = new Outputs(taxOutputs, fuelCostOutputs, fuelUsageOutputs);

  //Render results page and pass in outputs and userinputs
  res.render("results", { userInputs: userInputs, outputs: outputs });
});

//HISTORICAL PRICES PAGE
app.get("/historical", function(req, res) {
  res.render("historical", {moment1:moment(), moment2:moment()});
});

//FUEL SAVING TIPS PAGE
app.get("/tips", function(req, res) {
  res.render("tips");
});

//====================
//CALCULATION LOGIC
//====================
const newTaxRate = 0.4;

//value to convert from mpg to kpl
const conversionMultiplier = 0.425144;

//Fuel Rates From June 2016 Until November 2018
const petrolFuelRate = [
  2.85,
  2.93,
  2.85,
  2.82,
  2.91,
  2.84,
  2.91,
  2.78,
  2.98,
  2.96,
  2.97,
  3,
  3.18,
  2.94,
  3.16,
  3.25,
  3.38,
  3.19,
  3.27,
  3.35,
  3.29,
  3.44,
  3.31,
  3.4,
  3.6,
  3.96,
  3.88,
  3.91,
  3.89,
  3.91
];

const dieselFuelRate = [
  1.99,
  2.07,
  2.04,
  1.95,
  2.09,
  2.07,
  2.12,
  2.15,
  2.17,
  2.21,
  2.28,
  2.15,
  2.13,
  2.37,
  2.35,
  2.46,
  2.37,
  2.52,
  2.58,
  2.63,
  2.6,
  2.6,
  2.61,
  2.8,
  3.21,
  3.15,
  3.14,
  3.2,
  3.2
];

// Fuel Rates From Most Recent Month - added as global variable in app so it is accessible in header.ejs
app.locals.currentPetrolFuelRate = petrolFuelRate[petrolFuelRate.length - 1];
app.locals.currentDieselFuelRate = dieselFuelRate[dieselFuelRate.length - 1];


// Calculates average rates of petrol from June 2016 to June 2018
function avgFuelRate(fuelRate) {
  let sum = fuelRate[0];
  for (var i = 1; i < 25; i++) {
    sum += fuelRate[i];
  }
  return sum / 25;
}

// Calculates various fuel costs
function fuelCalculator(calcFunc, fuelrate) {
  // Calculations for gas fueltype
  if (userInputs[0].fuelType === "Gas") {
    //calculations using current fuel prices(post-tax)
    if (fuelrate === "current") {
      return (calcFunc() * app.locals.currentPetrolFuelRate).toFixed(2);
    } else {
      //calculations for monthly and yearly petrol fuel rates(pre-tax)
      return (calcFunc() * fuelrate(petrolFuelRate)).toFixed(2);
    }
    //calculations using current diesel prices(post-tax)
  } else if (fuelrate === "current") {
    return (calcFunc() * app.locals.currentDieselFuelRate).toFixed(2);
  } else {
    //calculations for monthly and yearly diel fuel rates (pre-tax)
    return (calcFunc() * fuelrate(dieselFuelRate)).toFixed(2);
  }
}

//Converts mpg to km/l
function mileageConverter() {
  return userInputs[0].fuelEfficiency * conversionMultiplier;
}

// Calculates Total Amount of Fuel Used by Vehicle
function totalFuelUsed() {
  return (userInputs[0].odometerReading / mileageConverter()).toFixed();
}

// Calculates Average Fuel Used Per Year
function yearlyFuelUsage() {
  return (totalFuelUsed() / userInputs[0].vehicleAge).toFixed();
}

// Calculates Average Fuel Used Per Month
function monthlyFuelUsage() {
  return (totalFuelUsed() / (userInputs[0].vehicleAge * 12)).toFixed();
}

// Calculates yearly taxes associated with new Fuel Tax
function yearlyFuelTaxes() {
  return (yearlyFuelUsage() * newTaxRate).toFixed(2);
}

// Calculates monthly taxes associated with new Fuel Tax
function monthlyFuelTaxes() {
  return (monthlyFuelUsage() * newTaxRate).toFixed(2);
}

//Calculates amount paid in taxes per 100km
function taxesPer100Km() {
  return ((newTaxRate / mileageConverter()) * 100).toFixed(2);
}

// Tell Express to listen for requests on port 3000 (starts server)
app.listen(port, IP, function() {
  //Logs "Server has started" to the console when server has been started
  console.log("Server has started");
});
