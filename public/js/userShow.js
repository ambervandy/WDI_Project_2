console.log("this works!");
$(function() {

	// Google Map Settings - create variable for the map
	var intializeMap = function () {
		// create variable for new map
		var map = new google.maps.Map(document.getElementById('userMap'), {
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
