// REQUIREMENTS
var express  = require('express');
	router 	 = express.Router();
	User	 = require('../models/users.js');
	Trip 	 = require('../models/trips.js');
	passport = require('passport');   



// INDEX
router.get('/', function(req, res) {
	// check if user is logged in
	res.locals.login = req.isAuthenticated();
	// find all users from database
	User.find({}, function(err, data) {
		// render index page
		res.render('users/index.ejs', {
			// variable users = user data
			users: data
		});
	});
});



// SIGN UP / NEW
router.post('/', passport.authenticate('local-signup', {
	// redirect back to the signup page if there is an error
    failureRedirect : '/'
}), function(req, res) {
		// if no error, then redirect to user page
		res.redirect('/users/' + req.user.id);  // <--------- comes from passport.js
});



// JSON
router.get('/json', function(req, res) {
	// find all users in database
	User.find({}, function(err, data) {
		// send to json route
		res.send(data);
	});
});



// JSON FOR SINGLE USER JSON LOCATIONS ONLY
router.get('/:id/json', function(req, res) {
	console.log('EDIT JSON ACCESSED');
	// find the user by id
	User.findById(req.params.id, function(err, data) {
		// send json data
		res.send(data);
	});	
});	



// LOGIN
router.post('/login', passport.authenticate('local-login', { 
	// failure redirects to index
	failureRedirect: '/' 
}), function(req, res) {
    // success redirects to user show page
    res.redirect('/users/' + req.user.id);
});



// LOGOUT
router.get('/logout', function(req, res) {
	// log user out
	req.logout();
	// redirect to index
	res.redirect('/');
});



// EDIT TRIP ROUTE
router.get('/:id/trips/edit', function(req, res) {
	// console.log('PARAMS: ', req.params.id);
	// console.log('QUERY: ', req.query);
	console.log(req.query.tripId);
	// find trip
	Trip.findById(req.query.tripId, function(err, data) {
		// console.log(data);
		res.render('trips/edit.ejs', data);
	});
});



// UPDATE SINGLE TRIP <----------------------------  NOT WORKING YETTTTTT ONLY UPDATING TRIPS
router.put('/:id/trips', function(req, res) {
	// console.log(req.params.id);
	// find user and update
	User.findById(req.params.id, function(err, userData) {
		// for loop to find the correct trip to update
		for(var i = 0; i < userData.trips.length; i++) {
			// if statement to find correct trip
			if (userData.trips[i].id == req.body.trip_id) {
				// console.log(req.body.trip_id);
				// explicitly change value of destination
				userData.trips[i].destination  = req.body.destination;
				userData.trips[i].tripImg 	   = req.body.tripImg;
				userData.trips[i].packing_list = req.body.packing_list;
				userData.trips[i].date_start   = req.body.date_start;
				userData.trips[i].date_finish  = req.body.date_finish;
				userData.trips[i].itinerary    = req.body.itinerary;
				userData.trips[i].different    = req.body.different;
				userData.trips[i].trip_rating  = req.body.trip_rating;
				userData.trips[i].lat          = req.body.lat;
				userData.trips[i].lng          = req.body.lng;
				// save user
				userData.save(function(err, editedUser) {
					// // // save trip
					Trip.findByIdAndUpdate(req.body.trip_id, req.body, { new:true }, function(err, tripData) {
						// save trip
						console.log(req.body.trip_id);
						tripData.save(function(err, newTrip) {
							// redirect back to trip page
							// console.log(editedUser);
							// console.log(newTrip);
							res.redirect('/trips/' + req.body.trip_id);
						});
					});
				});
			}
		}
	});
});



// SHOW
router.get('/:id', function(req, res) {
	console.log('USER EDIT ACCESSED');
	// user control - get req.user from passport
	res.locals.usertrue = (req.user.id == req.params.id);
	// if user is logged in, then render user's show page
	User.findById(req.params.id, function(err, data) {
		res.render('users/show.ejs', {
			// variable users in ejs = user data
			users: data
		});
	});
});



// NEW TRIP RENDER PAGE
router.get('/:id/newTrip', function(req, res) {
	console.log('NEW TRIP ACCESSED')
	// res.send('This works!');
	// for that user, add the new trip
	User.findById(req.params.id, function(err, data) {
		// render the new trip page
		res.render('trips/new.ejs', {
			users: data
		});
	});	
});



// NEW TRIP CREATE ROUTE
router.post('/:id/trips', function(req, res) {
	console.log('CREATE NEW TRIP')
	// res.send('This works!');
	// find user by id params
	User.findById(req.params.id, function(err, newUser) {
		// create new trip variable set it to req.body to model
		var newTrip = new Trip(req.body);
		// save newTrip to database
		newTrip.save(function(err, trip) {
			// push the new trip to the user's trips array
			newUser.trips.push(trip);
			// save the user with new array
			newUser.save(function(err, data) {
				// redirect to users show page
				res.redirect('/users/' + req.params.id);
			});
		});
	});
});



// EDIT USER
router.get('/:id/edit', function(req, res){
	console.log('EDIT USER');
	// find user
	User.findById(req.params.id, function(err, data){
		// send to user edit page with data
		res.render('users/edit.ejs', data);
	});
});



// UPDATE USER
router.put('/:id', function(req, res){
	// update user with form req.body
    User.findByIdAndUpdate(req.params.id, req.body, function(err, data){
    	// redirect to user's show page
    	res.redirect('/users/' + req.params.id);
    });
});



// DESTROY SINGLE TRIP
router.delete('/:id/trips', function(req, res) {
	// find user by id
	User.findById(req.params.id, function(err, userData) {
		// for loop to iterate through all trips
		for(var i = 0; i < userData.trips.length; i++) {
			// if the trip id matches the id from the delete form page
			if (userData.trips[i].id == req.body.trip_id) {
				// then delete this trip from the user
				userData.trips.id(req.body.trip_id).remove();
				// find the Trip in trips and remove
				Trip.findByIdAndRemove(req.body.trip_id, function(err, dataTrip){
					// save user
					userData.save(function(err, data) {
						// save trips
						dataTrip.save(function(err, tripData) {
							// redirect to user show page
							res.redirect('/users/' + req.params.id);
						});
					});
				});
			}
		}
	});
});



// DESTROY USER
router.delete('/:id', function(req, res) {
	// find user and remove by id params in url
	User.findByIdAndRemove(req.params.id, function(err, data) {
		// redirect to index home page
		res.redirect('/');
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



// module.exports
module.exports = router;



// ========================== TRASH CAN =============================


// UPDATE SINGLE TRIP
// router.put('/:id/trips', function(req, res) {
// 	User.findOneAndUpdate({
// 		trips.id: req.body.trip_id 
// 	}, {
// 		$set: req.body
// 	}, function(err, userData) {
// 		console.log(userData)
// 	}	
// 	});
// });


// CREATE
// router.post('/', function(req, res) {
// 	var newUser = new User(req.body);
// 	newUser.save(function(err, data) {
// 		res.redirect('/users');
// 	});
// });


// // DELETE SPECIFIC TRIP FROM USER
// router.delete('/:id/trips', function(req, res){
// 	// find user by url params
//     User.findById(req.params.id, function(err,user){
//     	// parent.child.id(child_id).remove();
//     	user.trips.id(req.body.trip_id).remove();
//     	// save user after trip deletion
//     	user.save(function(){
//     		// redirect to user show page
//       		res.redirect('/users/' + req.params.id);
//     	});
//   	});
// });



// UPDATE SINGLE TRIP
// router.put('/:id/trips', function(req, res) {
// 	// find trip by req.params
// 	Trip.findByIdAndUpdate(req.params.id, req.body, function(err, tripData) {
// 		// find user by id
// 		User.findById(tripData.user_id, function(err, userData) {
// 			// console.log(userData);
// 			// for loop to iterate through all trips
// 			for(var i = 0; i < userData.trips.length; i++) {
// 				// if trip id matches id from the update page
// 				if (userData.trips[i].id == req.params.id) {
// 					// then update the trip
// 					// console.log(userData.trips[i]);
// 					// save the trip
// 					tripData.save(function(err, data) {
// 						// save user
// 						userData.save(function(err, newData) {
// 							// redirect back to trip show page
// 							res.redirect('/trips/' + req.params.id);
// 						});	
// 					});
// 				}
// 			}
// 		});
// 	});
// });


