// Add console.log to check to see if our code is working.
console.log("working");
// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    //id: 'mapbox.streets',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
  DayNavigation: light,
  NightNavigation: dark
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [44.0, -80.0],
	zoom: 2,
	layers: [light]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
// Create a style for the lines.
let myStyle = {
	color: "#ffffa1",
	weight: 2
}
// Accessing the torontoRoutes GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/varshajha28/Mapping_Earthquakes/master/torontoRoutes.json";
var popup = L.popup()
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
  style: myStyle,
  onEachFeature: function(feature, layer) {
   if(feature.geometry.type == 'LineString'){
       layer.bindPopup("<h2>" +"Airline : " + feature.properties.airline + "</h2> <hr> <h3>" +"Destination : " +feature.properties.dst + "</h3>");

   }
  }  
}).addTo(map);
});



