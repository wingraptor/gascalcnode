// No longer using plotly; using chartJS

let graph1 = document.getElementById("gas-prices");
let graph2 = document.getElementById("diesel-prices");

document.addEventListener("DOMContentLoaded", function (event) {
  if (graph1 || graph2) {
    Plotly.newPlot("gas-prices", data, layout1);
    Plotly.newPlot("diesel-prices", data2, layout2);
  }
});

// Gas Prices
var trace1 = {
  x: ["Nov'17", "Dec'17", "Jan'18", "Feb'18", "Mar'18", "Apr'18",
    "May'18", "Jun'18", "Jul'18", "Aug'18", "Sep'18", "Oct'18", "Nov'18"],
  y: [3.19, 3.27, 3.35, 3.29, 3.44, 3.31,
    3.40, 3.60, 3.96, 3.88, 3.91, 3.89, 3.91
  ],
  type: 'scatter'
};

var layout1 = {
  title: "Historical Gas Prices",
  autosize: true,
  xaxis: {
    title: ""
  },
  yaxis: {
    title: "Bds $/litre"
  },
  annotations: [
    {
      x: trace1.x[0],
      y: trace1.y[0],
      xref: "x",
      yref: "y",
      text: "$" + trace1.y[0].toFixed(2),
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
    {
      x: trace1.x[6],
      y: trace1.y[6],
      xref: "x",
      yref: "y",
      text: "$" + trace1.y[6].toFixed(2),
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
    {
      x: trace1.x[trace1.x.length - 1],
      y: trace1.y[trace1.y.length - 1],
      xref: "x",
      yref: "y",
      text: "$" + trace1.y[trace1.y.length - 1].toFixed(2),
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    }
  ]
};

var data = [trace1];

//  Diesel Prices
var trace2 = {
  x: ["Nov'17", "Dec'17", "Jan'18", "Feb'18", "Mar'18", "Apr'18",
    "May'18", "Jun'18", "Jul'18", "Aug'18", "Sep'18", "Oct'18", "Nov'18"],
  y: [2.37, 2.52, 2.58, 2.63, 2.60, 2.60,
    2.61, 2.80, 3.21, 3.15, 3.14, 3.20, 3.20],
  type: 'scatter'
};

var layout2 = {
  title: "Historical Diesel Prices",
  autosize: true,
  xaxis: {
    title: ""
  },
  yaxis: {
    title: "Bds $/litre"
  },
  annotations: [
    {
      x: trace2.x[0],
      y: trace2.y[0],
      xref: "x",
      yref: "y",
      text: "$" + trace2.y[0].toFixed(2),
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
    {
      x: trace2.x[6],
      y: trace2.y[6],
      xref: "x",
      yref: "y",
      text: "$" + trace2.y[6].toFixed(2),
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
    {
      x: trace2.x[trace2.x.length - 1],
      y: trace2.y[trace2.y.length - 1],
      xref: "x",
      yref: "y",
      text: "$" + trace2.y[trace2.y.length - 1].toFixed(2),
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    }
  ]
};
var data2 = [trace2];

// update the layout to expand to the available size
// when the window is resized
window.onresize = function () {
  Plotly.relayout("diesel-prices", {
    "xaxis.autorange": true,
    "yaxis.autorange": true
  });
  Plotly.relayout("gas-prices", {
    "xaxis.autorange": true,
    "yaxis.autorange": true
  });
};