var mongoose = require('mongoose');


// properties User
var User = new mongoose.Schema({
	Ho:{type:String,select:true},
	Ten:{type:String,select:true},
	Phone:{type:Number},
	PassWord:{type:String},
	Ngay:{type:String,select:true},
	Thang:{type:String,select:true},
	Nam:{type:String,select:true},
	gender:{type:String,select:true}


});




//export data acount
module.exports.acount = mongoose.model('acounts',User);


