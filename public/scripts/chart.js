var ctx1 = document.getElementById("gas-prices");
var ctx2 = document.getElementById("diesel-prices");

//Change color of all text in graphs
Chart.defaults.global.defaultFontColor = "#e4e2ff";


var chart1 = new Chart(ctx1, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: ["Nov'17", "Dec'17", "Jan'18", "Feb'18", "Mar'18", "Apr'18",
      "May'18", "Jun'18", "Jul'18", "Aug'18", "Sep'18", "Oct'18", "Nov'18"],
    datasets: [{
      label: "Historical Gas Prices",
      // backgroundColor: 'rgb(255, 99, 132)',
      borderColor: '#cb4b16',
      pointBorderColor: "#e4e2ff",
      pointBackgroundColor: "#e4e2ff",
      pointRadius: 2,
      data: [3.19, 3.27, 3.35, 3.29, 3.44, 3.31,
        3.40, 3.60, 3.96, 3.88, 3.91, 3.89, 3.91, 3.71
      ],
    }]
  },

  // Configuration options go here
  options: {
    scales: {
      //options for y-axis
      yAxes: [{
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value, index, values){
            return "$" + value.toFixed(2);
          },
        },
        scaleLabel: {
          display:true,
          labelString: "Price/litre",
          fontSize: "14",
        }
      }],
      //options for x-axis
      xAxes:[{
        scaleLabel: {
          display:true,
          labelString: "Month",
          fontSize: "14",
        }
      }]
    },
    responsive: true
  }
});

//Diesel Prices
var chart2 = new Chart(ctx2, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: ["Nov'17", "Dec'17", "Jan'18", "Feb'18", "Mar'18", "Apr'18",
      "May'18", "Jun'18", "Jul'18", "Aug'18", "Sep'18", "Oct'18", "Nov'18"],
    datasets: [{
      label: "Historical Diesel Prices",
      // backgroundColor: 'rgb(255, 99, 132)',
      borderColor: '#cb4b16',
      pointBorderColor: "#e4e2ff",
      pointBackgroundColor: "#e4e2ff",
      pointRadius: 2,
      data: [2.37, 2.52, 2.58, 2.63, 2.60, 2.60,
        2.61, 2.80, 3.21, 3.15, 3.14, 3.20, 3.20, 3.17
      ],
    }]
  },

  // Configuration options go here
  options: {
    scales: {
      //options for y-axis
      yAxes: [{
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "$" + value.toFixed(2);
          },
        },
        scaleLabel: {
          display: true,
          labelString: "Price/litre",
          fontSize: "14",
        }
      }],
      //options for x-axis
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Month",
          fontSize: "14",
        }
      }]
    }
  }
});