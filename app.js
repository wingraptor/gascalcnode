var HistoricPrice = require("./models/historicprices");
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    express      = require("express");

var app = express();
mongoose.connect("mongodb://localhost:27017/gascalc_app", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

var userInputs = [];
var Outputs = function (taxOutputs, fuelCostOutputs, fuelUsageOutputs){
  this.taxes = taxOutputs,
  this.fuelCosts = fuelCostOutputs,
  this.fuelUsages = fuelUsageOutputs
};


//==================
// DATABASE CREATION
//==================

// HistoricPrice.create({
//   petrol: [2.85, 2.93, 2.85, 2.82, 2.91, 2.84, 2.91, 2.78, 2.98, 2.96, 2.97,
//     3, 3.18, 2.94, 3.16, 3.25, 3.38, 3.19, 3.27, 3.35, 3.29, 3.44, 3.31,
//     3.40, 3.60],
//   diesel: [1.99, 2.07, 2.04, 1.95, 2.09, 2.07, 2.12, 2.15, 2.17, 2.21, 2.28,
//     2.15, 2.13, 2.37, 2.35, 2.46, 2.37, 2.52, 2.58, 2.63, 2.60, 2.60,
//     2.61, 2.80]
// }, function(err,historicPrices){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(historicPrice);
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
  res.render("calculatorPage");
});

//CREATE ROUTE - Calculator Page
app.post("/gascalc", function(req, res) {
  var fuelEfficiency = req.body.fuelEfficiency,
    odometerReading = req.body.odometerReading,
    vehicleAge = req.body.vehicleAge,
    fuelType = req.body.fuelType;

  var newUserInputs = {
    fuelEfficiency: Number(fuelEfficiency),
    odometerReading: Number(odometerReading),
    vehicleAge: Number(vehicleAge),
    fuelType: fuelType
  };

  userInputs.push(newUserInputs);
  res.redirect("/gascalc/results");
});

//SHOW ROUTE - Calculator Results Page
app.get("/gascalc/results", function(req,res){
  let taxes = {
    yearly: yearlyFuelTaxes(),
    monthly: monthlyFuelTaxes(),
    per100km: taxesPer100Km()
  }
  let fuelCosts = {
    yearly: yearlyFuelCosts(),
    monthly: monthlyFuelCosts(),
    currentYearly: currentYearlyFuelCosts(),
    currentMonthly: currentMonthlyFuelCosts()
  }
  let fuelUsages = {
    total: totalFuelUsed(),
    monthly: monthlyFuelUsage(),
    yearly: yearlyFuelUsage()
  }
  let outputs = new Outputs(taxes, fuelCosts, fuelUsages);
  res.render("results", { userInputs: userInputs, outputs: outputs});
});

//HISTORICAL PRICES PAGE
app.get("/historical", function(req, res) {
  res.render("historical");
});

//FUEL SAVING TIPS PAGE
app.get("/tips", function(req, res) {
  res.render("tips");
});

//====================
//CALCULATION LOGIC
//====================
const newTaxRate = 0.40;

//value to convert from mpg to kpl
const conversionMultiplier = 0.425144;

//Fuel Rates From June 2016 Until June 2018
const petrolFuelRate = [
  2.85, 2.93, 2.85, 2.82, 2.91, 2.84, 2.91, 2.78, 2.98, 2.96, 2.97,
  3, 3.18, 2.94, 3.16, 3.25, 3.38, 3.19, 3.27, 3.35, 3.29, 3.44, 3.31,
  3.40, 3.60
]
const dieselFuelRate = [
  1.99, 2.07, 2.04, 1.95, 2.09, 2.07, 2.12, 2.15, 2.17, 2.21, 2.28,
  2.15, 2.13, 2.37, 2.35, 2.46, 2.37, 2.52, 2.58, 2.63, 2.60, 2.60,
  2.61, 2.80
]

// Fuel Rates From Most Recent Month
const currentPetrolFuelRate = 3.96;
const currentDieselFuelRate = 3.21;

// HistoricPrice.find({}, function(err, historicalPrice){
//   if(err){
//     console.log("Error");
//   } else {
//     console.log(historicalPrice);
//   }
// });


// Calculates average rates of petrol from June 2016 to June 2018
function avgFuelRate(fuelRate) {
  let sum = fuelRate[0];
  for (var i = 1; i < fuelRate.length; i++) {
    sum += fuelRate[i];
  }
  return sum / fuelRate.length;
}

// Calculates total fuel costs using average fuel price June 2016 to June 2018
function totalFuelCosts() {
  if (userInputs[0].fuelType === "Gas") {
    return (totalFuelUsed() * avgFuelRate(petrolFuelRate)).toFixed(2);
  } else {
    return (totalFuelUsed() * avgFuelRate(dieselFuelRate)).toFixed(2);
  }
}

// Calculates yearly fuel costs using average fuel price from June 2016 to June 2018
function yearlyFuelCosts() {
  if (userInputs[0].fuelType === "Gas") {
    return (yearlyFuelUsage() * avgFuelRate(petrolFuelRate)).toFixed(2);
  } else {
    return (yearlyFuelUsage() * avgFuelRate(dieselFuelRate)).toFixed(2);
  }
}

// Calculates monthly fuel costs using average fuel price from June 2016 to June 2018
function monthlyFuelCosts() {
  if (userInputs[0].fuelType === "Gas") {
    return (monthlyFuelUsage() * avgFuelRate(petrolFuelRate)).toFixed(2);
  } else {
    return (monthlyFuelUsage() * avgFuelRate(dieselFuelRate)).toFixed(2);
  }
}

// Calculates yearly fuel costs using fuel price from most recent month.
function currentYearlyFuelCosts() {
  if (userInputs[0].fuelType === "Gas") {
    return (yearlyFuelUsage() * currentPetrolFuelRate).toFixed(2);
  } else {
    return (yearlyFuelUsage() * currentDieselFuelRate).toFixed(2);
  }
}

// Calculates monthly fuel costs using fuel price from most recent month.
function currentMonthlyFuelCosts() {
  if (userInputs[0].fuelType === "Gas") {
    return (monthlyFuelUsage() * currentPetrolFuelRate).toFixed(2);
  } else {
    return (monthlyFuelUsage() * currentDieselFuelRate).toFixed(2);
  }
}

//Converts mpg to km/l
function mileageConverter() {
  return userInputs[0].fuelEfficiency * conversionMultiplier;
}

// Calculates Total Amount of Fuel Used by Vehicle
function totalFuelUsed() {
  let kmPerLitre = mileageConverter();
  return (userInputs[0].odometerReading / kmPerLitre).toFixed();
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
  return (newTaxRate / mileageConverter() * 100).toFixed(2);
}

// Tell Express to listen for requests on port 3000 (starts server)
app.listen(3000, function() {
  //Logs "Server has started" to the console when server has been started
  console.log("Server has started");
});
