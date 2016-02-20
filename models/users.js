// REQUIREMENTS
var mongoose 	= require('mongoose');
	tripSchema 	= require('./trips').schema;
    bcrypt      = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
	username:String,
	email:String,
	password:String,
	profileImg:String,
	trips: [tripSchema]
});




// model method to generate hash from password
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};



var User = mongoose.model('User', userSchema);
module.exports = User;