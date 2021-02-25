// from data.js
var tableData = data;


var table = d3.select("tbody");

//Clear table before rendering 
table.html(" ");

data.forEach( function(report) {

    // Adding a new row
    var row = table.append("tr");

    // Extracting data from each key value pair in the data dictionary
    
    Object.entries(report).forEach( function([key,value]) {
        // Adding column 
        var cell = row.append("th");
        // Adding Value
        cell.text(value);
    });

});

// Filtering by Date 

var inputDate = d3.select("#datetime");
var inputState = d3.select("#state");
var button = d3.select("#filter-btn");


function filterSearchDate (event) {

    var searchDate = d3.event.target.value;

    // Clear table before rendering 
    table.html(" ");

    // filtering data set 
    var filteredData = data.filter(data => data.datetime==searchDate);
    
    // inputting new filtered data onto website 

    filteredData.forEach( function(report) {

        // Adding a new row
        var row = table.append("tr");

        // Extracting data from each key value pair in the data dictionary
        
        Object.entries(report).forEach( function( [key,value]) {
            // Adding column 
            var cell = row.append("th");
            // Adding Value
            cell.text(value);
        });
    });

    // if no results found 
    if (filteredData.length == 0) {
        console.log ("No UFO sightings at that data!! Try another date.")
    };
    

};

// Listener for any date searches
inputDate.on("change", filterSearchDate);



// //filtering by State
// function filterSearchState (event) {

//     var searchState = d3.event.target.value;

//     // Clear table before rendering 
//     table.html(" ");

//     // filtering data set 
//     var filteredData = data.filter(data => data.state == searchState);
    
//     // inputting new filtered data onto website 

//     filteredData.forEach( function(report) {

//         // Adding a new row
//         var row = table.append("tr");

//         // Extracting data from each key value pair in the data dictionary
        
//         Object.entries(report).forEach( function( [key,value]) {
//             // Adding column 
//             var cell = row.append("th");
//             // Adding Value
//             cell.text(value);
//         });
//     });

//     // if no results found 
//     if (filteredData.length == 0) {
//         console.log ("No UFO sightings at that data!! Try another state.")
//     };
    

// };

// inputState.on("change", filterSearchState);


