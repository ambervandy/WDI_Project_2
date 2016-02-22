// REQUIREMENTS
var express  = require('express');
	router 	 = express.Router();
	Trip	 = require('../models/trips.js');
	User     = require('../models/users.js');
	userData = User.User;



// INDEX
router.get('/', function(req, res) {
	Trip.find({}, function(err, data) {
		res.render('trips/index.ejs', {
			trips: data
		});
	});
});


// JSON
router.get('/json', function(req, res) {
	Trip.find({}, function(err, data) {
		res.send(data);
	});
});


// JSON FOR INDIVIDUAL TRIP
router.get('/:id/json', function(req, res) {
	Trip.findById(req.params.id, function(err, data) {
		res.send(data);
	});
});


// SHOW
router.get('/:id', function(req, res) {
	Trip.findById(req.params.id, function(err, data) {
		res.render('trips/show.ejs', {
			trips: data
		});
	});
});


// EDIT
router.get('/:id/edit', function(req, res) {
	Trip.findById(req.params.id, function(err, data) {
		res.render('trips/edit.ejs', data);
	});
});


// UPDATE SPECIFIC TRIP ON USER
// router.put('/:id', function(req, res) {
// 	// find the trip to edit
// 	Trip.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
// 		// find the user by the id, pass in user data
// 		User.findByIdAndUpdate(data.user_id, { new: true }, function(err, user) {
// 			// need to loop through all user trips to find the right one to update
// 			for(var i = 0; i < user.trips.length; i++) {
// 				// if trip id = id of trip then save changes
// 				if (user.trips[i].id == req.params.id) {
// 					// then save that trip
// 					user.trips[i].save(function(err, newTrip) {
// 						// then save user
// 						user.save(function(err, newUser) {
// 							// redirect to trip show page
// 							res.redirect('/trips/' + req.params.id);
// 						});
// 					});
// 				}
// 			}
// 		});
// 	});
// });


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






