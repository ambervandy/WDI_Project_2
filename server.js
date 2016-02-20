// REQUIREMENTS
var express 		= require('express');
	bodyParser 		= require('body-parser');
	methodOverride 	= require('method-override');
	mongoose		= require('mongoose');
	passport        = require('passport');
	session			= require('express-session');
	port 			= process.env.PORT || 3000;
	app				= express();
	db				= mongoose.connection;

mongoose.connect('mongodb://localhost:27017/project_2');

// PASSPORT
require('./config/passport')(passport);


// CONTROLLERS
var usersController = require('./controllers/usersController');
	tripsController = require('./controllers/tripsController');


// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'winewinewineisfine' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

app.use('/users', usersController);
app.use('/trips', tripsController);


// SHOW WELCOME PAGE
app.get('/', function(req, res) {
	res.render('index.ejs');
});


// LISTENING
// db.once('open', function() {
// 	console.log('----- MONGOOSE IS RUNNING -----');
	app.listen(port, function() {
		console.log("----- SERVER IS RUNNING: PORT " + port + " -----");
	});
// });