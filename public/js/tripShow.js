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
				icon: 'https://res.cloudinary.com/dmjtck2cd/image/upload/v1456330609/destinations/marker.png',
				title: result.destination
			});


			// 5 star rating
		// var initializeRating = function() {
			var $star1 = $("#1");
			var $star2 = $("#2");
			var $star3 = $("#3");
			var $star4 = $("#4");
			var $star5 = $("#5");

			// console.log($star1.attr("src"));
			if (result.trip_rating == 1) {
				$star1.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
			}
			else if (result.trip_rating == 2) {
				$star1.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star2.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
			}
			else if (result.trip_rating == 3) {
				$star1.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star2.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star3.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
			}
			else if (result.trip_rating == 4) {
				$star1.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star2.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star3.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star4.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
			}
			else if (result.trip_rating == 5) {
				$star1.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star2.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star3.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star4.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
				$star5.attr("src", "https://res.cloudinary.com/dmjtck2cd/image/upload/v1456353798/destinations/starSolid.png");
			}

		});


	} // end initialize

	// Display the map
	google.maps.event.addDomListener(window, 'load', intializeMap);




}); // end window onload









