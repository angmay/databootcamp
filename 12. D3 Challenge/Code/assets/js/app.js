var svgHeight = 600; 
var svgWidth = 1000;

var margin = {
    top: 50, 
    bottom: 100, 
    right: 50, 
    left: 100
};

var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate (${margin.left},${margin.right})`);


d3.csv("../assets/data/data.csv").then( function(rawData) {

    //cast/parse data to intergers 
    rawData.forEach ( function(data) {
        data.id = +data.id;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
        data.age = +data.age; 
        data.obesity = +data.obesity;
        data.income = +data.income;      
    });

    //Healthcare and Poverty data
    
    obesityData = rawData.map( d => d.obesity);
    smokerData = rawData.map( d => d.smokes);
    healthcareData = rawData.map( d => d.healthcare);
    povertyData = rawData.map( d => d.poverty);
    ageData = rawData.map( d => d.age);
    incomeData = rawData.map( d => d.income);

    //scaling for x and y variables 
    var xScale = d3.scaleLinear()
        .domain( [8, d3.max(povertyData)] )
        .range( [0, chartWidth] );
    
    var yScale = d3.scaleLinear()
        .domain( [0, d3.max(healthcareData)] )
        .range( [chartHeight, 0] );
    
    //setting up axes 
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    //plotting axes 
    chartGroup.append("g")
        .call(yAxis);
    
    chartGroup.append("g")
        .call(xAxis)
        .attr("transform", `translate (0,${chartHeight})`);

        
    //plotting chart data 
    var circleGroup = chartGroup.selectAll("circle")
        .data(rawData)
        .enter()
        .append("circle")
        .attr("cx", function(d){ return xScale(d.poverty)})
        .attr("cy", function(d){ return yScale(d.healthcare)})
        .attr("r", 15)
        .classed("stateCircle", true);

    //adding state labels 
    chartGroup.selectAll("text")
        .data(rawData, function(d) {return d.abbr})
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("text-anchor", "middle")
        .classed("stateText", true)
        .attr("x", function(d){ return xScale(d.poverty)})
        .attr("y", function(d){ return yScale(d.healthcare)+5});

    //labels 
    chartGroup.append("text")
        .attr("transform", `translate(${-margin.left/2}, ${chartHeight/2}) rotate(-90)`) 
        .classed("aText", true)
        .text("Lacks HealthCare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth/2}, ${chartHeight+margin.bottom-10})`) 
        .classed("aText", true)
        .text("In Poverty (%)");

    //tool-tips 
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80,-60])
        .html(function(d) {
            return (`<strong>${d.state}<strong>
            <br>Lacks Health Care: ${d.healthcare}%
            <br>In Poverty: ${d.poverty}%`)
        });

    chartGroup.call(toolTip);

    circleGroup
        .on("mouseover", function(d) {
            toolTip.show(d, this);
            })
        .on("mouseout", function(d) {
            toolTip.hide(d);
            })

});


