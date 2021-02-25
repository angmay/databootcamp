//added layers for extra visual types
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
})

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox/light-v10",
  accessToken: API_KEY
})

var baseMaps = {
  Street: streetmap, 
  Light: lightmap, 
  Dark: darkmap
};


//default map
var mymap = L.map("mapid", {
    center: [0,0],
    zoom: 2,
    layers: [streetmap] //default layers
});
  

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(mymap);

// Create a layer control, containing our baseMaps, and add them to the map
L.control.layers(baseMaps).addTo(mymap);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then( function(rawData) {

    geojsonLayer = L.geoJson(rawData, {
      style: function(feature) {
        
        var depth = feature.geometry.coordinates[2]

        if (depth <= 10) {return {color:"#0bfc03"} }
        else if (depth <=30) {return {color:"#dffc03"}}
        else if (depth <=50) {return {color:"#fcc203"}}
        else if (depth <=70) {return {color:"#fca503"}}
        else if (depth <=90) {return {color:"#fc4e03"}}
        else {return {color:"#fc0303"}}

      },
      pointToLayer: function(feature, latlng) {
          return new L.CircleMarker(latlng, {
            radius: (feature.properties.mag*2), 
            fillOpacity: 0.85
          });
      },
      onEachFeature: function (feature, layer) {
          layer.bindPopup(`${feature.properties.place}<br>Mag: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]}`);
      }
  });

  mymap.addLayer(geojsonLayer);

  var legend = L.control({ position: "bottomright" });

  function getColor(d) {
    return d < 10 ? '#0bfc03' :
           d < 30 ? '#dffc03' :
           d < 50 ? '#fcc203' :
           d < 70 ? '#fca503' :
           d < 90 ? '#fc4e03' :
                    '#fc0303';
  }
  
  legend.onAdd = function (canMap) {
    
        var div = L.DomUtil.create("div", "info legend");
            mags = [-10,10,30,50,70,90];
            labels = [`<strong><h5>Depth</h5></strong>`];
    
        // loop through intervals and generate a label with a colored square for each interval
        for (var i = 0; i < mags.length; i++) {
            div.innerHTML +=
            labels.push(
                '<i style="background:' + getColor(mags[i] + 1) + '"></i> ' +
                mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+'));
        }
          div.innerHTML = labels.join('<br>');
        return div;
  };
    
  legend.addTo(mymap);

})  
