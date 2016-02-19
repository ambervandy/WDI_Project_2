// REQUIREMENTS
var mongoose 	= require('mongoose');
	tripSchema 	= require('./trips').schema;

var userSchema = mongoose.Schema({
	username:String,
	email:String,
	password:String,
	profileImg:String,
	trips: [tripSchema]
});




var User = mongoose.model('User', userSchema);
module.exports = User;