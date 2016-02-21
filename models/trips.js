// REQUIEMENTS
var mongoose = require('mongoose');


var tripSchema = mongoose.Schema({
	destination:String,
	tripImg:String,
	packing_list:String,
	date_start:Date,
	date_finish:Date,
	itinerary:String,
	trip_rating:String,
	user_id:String
});


var Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;