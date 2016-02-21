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



// SHOW
router.get('/:id', function(req, res) {
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



// NEW TRIP PAGE
router.get('/:id/trips', function(req, res) {
	// res.send('This works!');
	// for that user, add the new trip
	User.findById(req.params.id, function(err, data) {
		// render the new trip page
		res.render('trips/new.ejs', {
			users: data
		});
	});	
});



// NEW TRIP ROUTE
router.post('/:id/trips', function(req, res) {
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



// EDIT
router.get('/:id/edit', function(req, res){
	// find user
	User.findById(req.params.id, function(err, data){
		// send to user edit page with data
		res.render('users/edit.ejs',data);
	});
});



// UPDATE
router.put('/:id', function(req, res){
	// update user with form req.body
    User.findByIdAndUpdate(req.params.id, req.body, function(err, data){
    	// redirect to user's show page
    	res.redirect('/users/' + req.params.id);
    });
});



// DESTROY
router.delete('/:id', function(req, res) {
	// find user and remove by id params in url
	User.findByIdAndRemove(req.params.id, function(err, data) {
		// redirect to index home page
		res.redirect('/');
	});	
});



// DELETE SPECIFIC TRIP FROM USER
router.delete('/:id/trips', function(req, res){
	// find user by url params
    User.findById(req.params.id, function(err,user){
    	// parent.child.id(child_id).remove();
    	user.trips.id(req.body.trip_id).remove();
    	// save user after trip deletion
    	user.save(function(){
    		// redirect to user show page
      		res.redirect('/users/' + req.params.id);
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


// module.exports
module.exports = router;



// ========================== TRASH CAN =============================


// CREATE
// router.post('/', function(req, res) {
// 	var newUser = new User(req.body);
// 	newUser.save(function(err, data) {
// 		res.redirect('/users');
// 	});
// });





