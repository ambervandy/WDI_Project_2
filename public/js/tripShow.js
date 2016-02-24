console.log("this works!");
$(function() {

	// change date to nicer looking format
	var oldDate = document.getElementById("date").innerHTML;
	// var newDate = oldDate.split("-");
	// var newDate = new Date(oldDate);
	// for loop it iterate through each index
	// for (var i = 0; i < newDate.length; i++) {
	// 	var superNew = [];
	// 	var first = newDate[i].split("-").reverse().join();
	// 	superNew.push(first);
		console.log(oldDate);
	// }


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
				title: result.destination
			});

		});

	} // end initialize

	// Display the map
	google.maps.event.addDomListener(window, 'load', intializeMap);

}); // end window onload









