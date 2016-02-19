// REQUIREMENTS
var express = require('express');
	router 	= express.Router();
	User	= require('../models/users.js');
	Trip 	= require('../models/trips.js');


// INDEX
router.get('/', function(req, res) {
	User.find({}, function(err, data) {
		res.render('users/index.ejs', {
			users: data
		});
	});
});


// CREATE
router.post('/', function(req, res) {
	var newUser = new User(req.body);
	newUser.save(function(err, data) {
		res.redirect('/users');
	});
});

// SIGN UP / NEW


// JSON
router.get('/json', function(req, res) {
	User.find({}, function(err, data) {
		res.send(data);
	});
});


// SHOW
router.get('/:id', function(req, res) {
	User.findById(req.params.id, function(err, data) {
		res.render('users/show.ejs', {
			users: data
		});
	});
});


// EDIT
router.get('/:id/edit', function(req, res) {
	User.findById(req.params.id, function(err, data) {
		res.render('users/edit.ejs', data);
	});
});


// UPDATE
router.put('/:id', function(req, res) {
	User.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
		res.redirect('/users/' + req.params.id);
	});	
});


// DESTROY
router.delete('/:id', function(req, res) {
	User.findByIdAndRemove(req.params.id, function(err, data) {
		res.redirect('/users');
	});	
});


module.exports = router;









