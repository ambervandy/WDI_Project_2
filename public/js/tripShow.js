console.log("this works!");
$(function() {

	// Google Map Settings - create variable for the map
	var intializeMap = function () {
		// create variable for new map
		var map = new google.maps.Map(document.getElementById('mapImg'), {
		  zoom: 2,
		  center: new google.maps.LatLng(40.696829, -73.935232),
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		// Add new markers
		// addMarkers(map);

	} // end initialize

	// Display the map
	google.maps.event.addDomListener(window, 'load', intializeMap);

}); // end window onload

// function for adding markers
var addMarkers = function(map) {

	//ajax call to get locations data from 'locations/json' route
	$.ajax('/trips/json');
		var marker = new google.maps.Marker ({
		    map: map,
		    icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
		    position: { lat: result[i].lat, lng: result[i].lng },
		    title: result[i].name
		});
	});
} // end addMarkers








