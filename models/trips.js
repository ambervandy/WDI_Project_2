// REQUIEMENTS
var mongoose = require('mongoose');


var tripSchema = mongoose.Schema({
	destination:String,
	tripImg:String,
	packing_list:String,
	date_start:String,
	date_finish:String,
	itinerary:String,
	different:String,
	trip_rating:String,
	user_id:String,
	lat:Number,
	lng:Number
});


var Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;