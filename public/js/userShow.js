console.log("this works!");
$(function() {

	// Google Map Settings - create variable for the map
	var intializeMap = function () {

		// create variable for new map
		var map = new google.maps.Map(document.getElementById('userMap'), {
		    zoom: 1,
		    minZoom: 0,
		    center: new google.maps.LatLng(24.529795, 4.206753),
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		
		// Add new markers
		addMarkers(map);

	} // end initialize

	// Display the map
	google.maps.event.addDomListener(window, 'load', intializeMap);

}); // end window onload


// add markers function
var addMarkers = function(map) {
	// get user id
	var $userId = $("#hidden").val();
	// ajax call to get lat and lng from 'trips/json' route
	$.ajax('/users/' + $userId + '/json')
	.done(function(result) {
		// console.log(result);
		// need for loop to iterate through all trips
		for (var i = 0; i < result.trips.length; i++) {
			var marker = new google.maps.Marker ({
			    map: map,
			    icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
			    position: { lat: result.trips[i].lat, lng: result.trips[i].lng },
			    title: "My Trips!"
			});
		};
	});
} // end addMarkers function









