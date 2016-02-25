console.log('TRIP INDEX works!');

$(function() {

// Google Map Settings - create variable for the map
	var intializeMap = function () {

		// create variable for new map
		var map = new google.maps.Map(document.getElementById('mapImg'), {
		    zoom: 2,
		    minZoom: 0,
		    center: new google.maps.LatLng(24.529795, 4.206753),
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		
		// Add new markers
		addMarkers(map);

	} // end initialize

	// Display the map
	google.maps.event.addDomListener(window, 'load', intializeMap);


}); // <-------------------------------- END WINDOW.ONLOAD

// add markers function
var addMarkers = function(map) {
	// ajax call to get lat and lng from 'trips/json' route
	$.ajax('/trips/json')
	.done(function(result) {
		// console.log(result);
		// need for loop to iterate through all trips
		for (var i = 0; i < result.length; i++) {
			var marker = new google.maps.Marker ({
			    map: map,
			    icon: 'https://res.cloudinary.com/dmjtck2cd/image/upload/v1456330609/destinations/marker.png',
			    position: { lat: result[i].lat, lng: result[i].lng },
			    title: result[i].destination,
			    url: '/users/'
			});
			// onclick function to map to the url of the marker
			google.maps.event.addListener(marker, 'click', function() {
        		window.location.href = this.url;
   			});
		};
	
	});
} // end addMarkers function


