console.log("this works!");
$(function() {


	// Google Map Settings - create variable for the map
	var intializeMap = function () {
		// get trip id
		var $tripId = $("#hidden").val();
		// console.log($tripId);
		// ajax call to get lat and lng from 'trips/json' route
		$.ajax('/trips/' + $tripId + '/json')
		.done(function(result) {
			// create variable for new map
			var map = new google.maps.Map(document.getElementById('mapImg'), {
				zoom: 5,
				center: {lat: result.lat, lng: result.lng},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			var marker = new google.maps.Marker({
				position: {lat: result.lat, lng: result.lng},
				map: map,
				icon: 'http://res.cloudinary.com/dmjtck2cd/image/upload/v1456330609/destinations/marker.png',
				title: result.destination
			});

		});

	} // end initialize

	// Display the map
	google.maps.event.addDomListener(window, 'load', intializeMap);

}); // end window onload









