# Bajan Gas Price Calculator 

This is a web app which provides useful and interesting information related to fuel costs in Barbados.  

With this web app you will be able to see: 

* Current prices of diesel and petrol in Barbados 
* Historical diesel and petrol prices in Barbados (12-months) 
* Fuel saving tips 
* Estimates of taxes spent on fuel 
* Estimates of yearly/monthly and per km fuel expenses 
* Estimates of total/yearly and monthly fuel usage 

## Getting Started 

Visit the [homepage](https://guarded-caverns-56336.herokuapp.com/gascalc/new) where you can find current diesel and petrol/gas prices in the navbar.  

In the body of the homepage you will find text input fields: 
 
* Fuel Efficiency in mpg: if you don't know your vehicle's mpg you can visit this [site](http://www.fuelly.com/car) to find it. 
* Odometer reading: this is the total distance travelled by your vehicle in km. 
* Vehicle Age: age of vehicle in years 
* Type of Fuel: petrol/gas or diesel 

Enter values in fields the above fields and click calculate to see some calculated values are divided into three categories:  

* **Fuel Taxes**: 

These represent an estimate of the amount of money you will spend on taxes in fuel per month, year and per 100km travelled. The [tax](https://www.barbadosadvocate.com/news/nsrl-road-tax-be-removed-july-1) only refers to the fuel tax of 40cents/L set by the government of Barbados to replace road tax.  

  In general:  

  **Tax spent** = **tax rate** * **average distance travelled in specified time** 

  Where average distance travelled in specified time is calculated using the age of the vehicle and the total distance it has travelled during that time frame.  

* **Total Costs**: 

These values represent an estimate of the total costs associated with fuel for a specific time frame (month or year) or per km. Additionally, these costs are split in two categories:  

  * The price one would have paid without the added fuel tax  

  * The price one would have paid with the added fuel tax (using current fuel price) 

  Again, in general:  

  Average distances travelled per month and year are calculated using the age of the vehicle and the total distance it has travelled during that time frame.  

* **Total Usages**: 
You can get estimates of the amount of fuel used, over the life of the vehicle, per month and per year.  

Again, in general:  
Average distances travelled per month and year are calculated using the age of the vehicle and the total distance it has travelled during that time frame.   

## Built With 
* [Node.js](https://nodejs.org/en/) - Server environment used 
* [Express](https://expressjs.com/) - Web app Framework used 
* [EJS](https://ejs.co/) - Templating Language used 
* [Bulma](https://bulma.io/) - CSS Framework used 
* [Particles.js](https://vincentgarreau.com/particles.js/) - Particle effects 
* [Chart.js](https://www.chartjs.org/) - Used to generate historical  fuel price charts 
* [Heroku](https://www.heroku.com/home) - Web app hosting platform used 

## Authors 
* **[Akono Brathwaite](https://www.akonobrathwaite.com)** 