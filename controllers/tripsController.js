// REQUIREMENTS
var express  = require('express');
	router 	 = express.Router();
	Trip	 = require('../models/trips.js');
	User     = require('../models/users.js');
	userData = User.User;
	passport = require('passport');



// INDEX
router.get('/', function(req, res) {
	console.log('TRIPS INDEX');
	// check if user is logged in
	res.locals.login = req.isAuthenticated();
	Trip.find({}, function(err, data) {
		res.render('trips/index.ejs', {
			trips: data
		});
	});
});



// JSON
router.get('/json', function(req, res) {
		console.log('TRIPS JSON');
	Trip.find({}, function(err, data) {
		res.send(data);
	});
});



// JSON FOR INDIVIDUAL TRIP
router.get('/:id/json', function(req, res) {
	console.log('TRIPS ONE JSON');
	Trip.findById(req.params.id, function(err, data) {
		res.send(data);
	});
});


// SHOW
router.get('/:id', function(req, res) {
	console.log('TRIPS SHOW');
	Trip.findById(req.params.id, function(err, data) {
		// user control - get req.user from passport and see if it's the same as user id
		// console.log(req.user.id);
		// console.log(data.user_id);
		res.locals.usertrue = (req.user.id == data.user_id);
			res.render('trips/show.ejs', {
				trips: data
			});
	});
});


// ROUTE MIDDLEWARE TO MAKE SURE USER IS LOGGED IN
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}



module.exports = router;





// ================================ TRASH CAN ===================================

// DESTROY (DOESN'T DELETE FROM USER'S ARRAY)
// router.delete('/:id', function(req, res) {
// 	Trip.findByIdAndRemove(req.params.id, function(err, data) {
// 		res.redirect('/users')
// 	});
// });


	// find user by url params
//     Trip.findById(req.params.id, function(err,trip){
//     	// parent.child.id(child_id).remove();
//     	trip.trips.id(req.body.trip_id).remove();
//     	// save user after trip deletion
//     	user.save(function(){
//     		// redirect to user show page
//       		res.redirect('/users/' + req.params.id);
//     	});
//   	});
// });


// UPDATE (THIS ONLY UPDATES TRIP, NOT TRIP IN USER ARRAY);
// router.put('/:id', function(req, res){
//     // need to find the user so we can find the array to update the trip in users
//     // for loop to iterate through all users, then loop to iterate through that user's trips?
//     // may need to rethink where to do this
// 	Trip.findByIdAndUpdate(req.params.id, req.body, function(err, tripData){
// 		res.redirect('/trips/' + req.params.id);
// 	});	
// });

// DELETE SPECIFIC TRIP FROM USER
// router.delete('/:id', function(req, res){
// 	// find the trip to delete
// 	Trip.findById(req.params.id, function(err, data) {
// 		// find the user by the id, pass in user data
// 		User.findById(data.user_id, function(err, user) {
// 			// need to loop through the trips to find the right one to remove from user
// 			// console.log(user.trips[3].id);
// 			for(var i = 0; i < user.trips.length; i++) {
// 				// if trip id = id of trip, then delete
// 				if (user.trips[i].id == req.params.id) {
// 					// console.log(user.trips[i].id);
// 					// then remove that trip
// 					user.trips[i].remove();
// 					// save the user without the trip
// 					user.save(function(err, userData) {
// 						// redirect to the user's show page
// 						res.redirect('/users/' + data.user_id);
// 					});
// 				}
// 			}
// 		});
// 	});
// });



// UPDATE
// router.put('/:id', function(req, res) {
// 	// console.log(req.body);
// 	// find the trip and update with req.body from the form
// 	Trip.findByIdAndUpdate(req.params.id, req.body, function(err, tripData) {
// 		// find user to update
// 		User.findById(tripData.user_id, function(err, userData) {
// 			// console.log(userData);
// 			// loop through all user trips to find the correct trip to update
// 			for (var i = 0; i < userData.trips.length; i++) {
// 				// if the id of the trip matches req.params.id
// 				if(userData.trips[i].id == req.params.id) {
// 					// save user with updated trip data
// 					userData.save(function(err, data) {
// 						// redirect back to trip page
// 						res.redirect('/trips/' + req.params.id);
// 					});	
// 				}
// 			}
// 		});
// 	});
// });




// EDIT
// router.get('/:id/edit', function(req, res) {
// 	Trip.findById(req.params.id, function(err, data) {
// 		res.render('trips/edit.ejs', data);
// 	});
// });



// UPDATE SPECIFIC TRIP ON USER
// router.put('/:id', function(req, res) {
// 	// find the trip to edit
// 	Trip.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
// 		// find the user by the id, pass in user data
// 		User.findById(data.user_id, function(err, user) {
// 			// need to loop through all user trips to find the right one to update
// 			console.log(user.trips)
// 			// for(var i = 0; i < user.trips.length; i++) {
// 			// 	// if trip id = id of trip then save changes
// 			// 	if (user.trips[i].id == req.params.id) {
// 			// 		// then save that trip
// 			// 		user.trips[i].save(function(err, newTrip) {
// 			// 			// then save user
// 			// 			user.save(function(err, newUser) {
// 			// 				// redirect to trip show page
// 			// 				res.redirect('/trips/' + req.params.id);
// 			// 			});
// 			// 		});
// 			// 	}
// 			// }
// 		});
// 	});
// });
