var app = angular.module('MainApp', ['d3']);
app.controller('AppController', ['d3', '$scope', function(d3, $scope){



    $scope.drawBarChart = function()
    {

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
var	parseDate = d3.time.format("%Y-%m").parse;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%a"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
  .attr({
    width : width + margin.left + margin.right,
    height : height + margin.top + margin.bottom
    })
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("bar-data.csv", function(error, data) {

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });
	
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr({
        class : "x axis",
        transform : "translate(0," + height + ")"
      })
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr({
        dx : "-.8em",
        dy : "-.55em",
        transform : "rotate(-90)"
      });

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
    .attr({
      transform : "rotate(-90)",
      y : 6,
      dy : ".71em"
      })
      .style("text-anchor", "end")
      .text("Value ($)");

  svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", "steelblue")
      .attr({
        x : function(d) { return x(d.date)},
        width : x.rangeBand(),
        y : function(d) { return y(d.value)},
        height : function(d) { return height - y(d.value)}
      });

});

    }

    $scope.drawBarChart();
    
}]);

