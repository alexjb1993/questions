//Javascript file which defines the data and functions used in the index map box

// Adapted from: https://github.com/claireellul/cegeg077-week5app/blob/master/ucfscde/www/js/appActivity.js

var mymap = L.map('mapid').setView([51.499, -0.10], 13);

// Create custom marker
var MarkerPurple = L.AwesomeMarkers.icon({
icon: 'play',
markerColor: 'purple'
});

// Load the map tiles from the mapbox API and load the OSM map (citations embedded at bottom of map)
function loadMap() {
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',{
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
		}).addTo(mymap);
}

// Function to input the latitiude and longitude values into the relevant text boxes on map click
mymap.on('click', function(e) {
		document.getElementById("lat").value = e.latlng.lat;
		document.getElementById("lng").value = e.latlng.lng;
});

// create a popup when the map is clicked to specify question location
var popup = L.popup();
function onMapClick(e) {
		popup
		.setLatLng(e.latlng)
		.setContent("Question location:" + e.latlng.toString())
		.openOn(mymap);
	}
// add popup to map
mymap.on('click', onMapClick);

/* Track Location not working
function userTrack() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
		alert("geolocation is not supported by this browser");
    }
}
function showPosition(position) */

// Create variable to hold the XMLHttpRequest()
var reqXML;

// Create a variable to hold the questions
var questGeoJSON;

// Call the question data through the server using XMLHttpRequest
function questGet() {
		reqXML = new XMLHttpRequest();
		reqXML.open('GET','http://developer.cege.ucl.ac.uk:30285/questGet');
		reqXML.onreadystatechange = questReturn;
		reqXML.send();
	}

// Get response from data server, then process it
function questReturn() {
// Wait until data is ready
		if (reqXML.readyState == 4) {
// Process the data
		var questData = reqXML.responseText;
		questLoad(questData);
	}
}

// Add the question data from the database to the map
function questLoad(questData) {
// Convert the WKT to JSON
		var questJSON = JSON.parse(questData);
		// Load as a geoJSON layer
		var questGeoJSON = L.geoJson(questJSON,
		{
// Create a point layer from latitude and longitude values
pointToLayer: function (feature, latlng)
{
// popup the location descrpition and question on question marker click
		return L.marker(latlng, {icon:MarkerPurple}).bindPopup("<p>" + feature.properties.question + "</b>");
	},
// Add the question markers to the map
}).addTo(mymap);
// set map extent to show all points
mymap.fitBounds(questGeoJSON.getBounds());
}
