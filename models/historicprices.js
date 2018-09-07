var mongoose = require("mongoose");

//Rates of petrol from June 2016 to June 2018
var pretaxPricesSchema = new mongoose.Schema({
  petrol: [],
  diesel: []
});

module.exports = mongoose.model("PretaxPrice", pretaxPricesSchema);

