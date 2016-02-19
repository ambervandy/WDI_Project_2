// REQUIREMENTS
var express = require('express');
	router 	= express.Router();
	Trip	= require('../models/trips.js')

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

// CREATE

// SHOW

// EDIT

// UPDATE

// DESTROY





module.exports = router;