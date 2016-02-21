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


// SHOW
router.get('/:id', function(req, res) {
	Trip.findById(req.params.id, function(err, data) {
		res.render('trips/show.ejs', {
			trips: data
		});
	});
});


// DELETE SPECIFIC TRIP FROM USER
router.delete('/:id', function(req, res){
	// find the trip to delete
	Trip.findById(req.params.id, function(err, data) {
		// find the user by the id
		User.findById(data.user_id, function(err, user) {
			// need to loop through the trips to find the right one to remove from user
			res.send(user.trips[1].id);
			// for(i = 0; i < 1000; i++) {
			// 	// if trip id = id of trip, then delete
			// 	if (user.trips[i].id == req.params.id) {
			// 		res.send(user.trips[i].id);
			// 		// then remove that trip
			// 		// user.trips[i].remove();
			// 		// });
			// 	}
			// }
		});
	});
});





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

// EDIT
// router.get('/:id/edit', function(req, res) {
// 	Trip.findById(req.params.id, function(err, data) {
// 		res.render('trips/edit.ejs', data);
// 	});
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





module.exports = router;





// ================================ TRASH CAN ===================================

// DESTROY (DOESN'T DELETE FROM USER'S ARRAY)
// router.delete('/:id', function(req, res) {
// 	Trip.findByIdAndRemove(req.params.id, function(err, data) {
// 		res.redirect('/users')
// 	});
// });











