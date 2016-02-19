// REQUIREMENTS
var express 		= require('express');
	app				= express();
	port 			= process.env.PORT || 3000;
	mongoose		= require('mongoose');
	morgan			= require('morgan');
	bodyParser 		= require('body-parser');
	methodOverride 	= require('method-override');
	db				= mongoose.connection;

mongoose.connect('mongodb://localhost:27017/project_2');

// PASSPORT
// require('.config/passport.js')(passport);


// CONTROLLERS
var usersController = require('./controllers/usersController');
	tripsController = require('./controllers/tripsController');


// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res) {
	if(req.body && typeof req.body === 'object' && '_method' in req.body) {
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));


// PASSPORT
// app.use(session({ secret: 'winewinewineisfine' }));
// app.use(passport.initialize());
// app.use(passport.session());


app.use('/trips', tripsController);
app.use('/users', usersController);


// SHOW WELCOME PAGE
app.get('/', function(req, res) {
	res.render('index.ejs');
});


// LISTENING
db.once('open', function() {
	console.log('----- MONGOOSE IS RUNNING -----');
	app.listen(port, function() {
		console.log("----- SERVER IS RUNNING: PORT " + port + " -----");
	});
});