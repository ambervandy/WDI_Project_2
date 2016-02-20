// REQUIREMENTS
var express = require('express');
	router 	= express.Router();
	Trip	= require('../models/trips.js');
	User    = require('../models/users.js');

// INDEX
router.get('/', function(req, res) {
	Trip.find({}, function(err, data) {
		res.render('trips/index.ejs', {
			trips: data
		});
	});
});

// NEW ----- need to do this in the users controller because users are adding trips

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

// EDIT
router.get('/:id/edit', function(req, res) {
	Trip.findById(req.params.id, function(err, data) {
		res.render('trips/edit.ejs', data);
	});
});

// UPDATE (THIS ONLY UPDATES TRIP, NOT TRIP IN USER ARRAY);
router.put('/:id', function(req, res){
    // need to find the user so we can find the array to update the trip in users
	Trip.findByIdAndUpdate(req.params.id, req.body, function(err, tripData){
		res.redirect('/trips/' + req.params.id);
	});	
});

// DESTROY (DOESN'T DELETE FROM USER'S ARRAY)
router.delete('/:id', function(req, res) {
	Trip.findByIdAndRemove(req.params.id, function(err, data) {
		res.redirect('/users')
	});
});



module.exports = router;

















