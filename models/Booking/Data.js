var mongoose = require('mongoose');




//properties Booking
var Booking = new mongoose.Schema({

	User_id:{type:String, index:true},
	Name:{type:String},
	Phone:{type:Number},
	Email:{type:String},
	Place:{type:String,select:true},
	AmountfPeople:{type:Number,index:true}
});

//export data Booking
module.exports.Book = mongoose.model('Book',Booking);
