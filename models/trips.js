// REQUIEMENTS
var mongoose = require('mongoose');


var tripSchema = mongoose.Schema({
	destination:String,
	tripImg:String,
	packing_list:String,
	date_start:Date,
	date_finish:Date,
	itinerary:String,
	different:String,
	trip_rating:String,
	user_id:String,
	lat:String,
	lng:String
});


var Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;