var booking = require('../models/Booking/ModelBooking');



//exports insert
exports.insert = function(req,res) {
	let book = req.body;
	console.log(book);
    booking.AddBook(book).then(function(Book)  {
        (err) => res.send(err + '')});
}




//update Place
exports.UdatePlace = function(req,res){
	let xphone = req.body.Phone;
	let NewPlace = req.body.NewPlace;
	booking.UdatePlaceByPhone(xphone,NewPlace);
	

}


exports.UpdateAmountfPeople = function(req,res){
	let xphone = req.body.Phone;
	let NewAmountfPeople = req.body.NewAmountfPeople;
	booking.UdateAmountfPeopleByPhone(xphone,NewAmountfPeople);

}



exports.delete = function(req,res){
	let xphone = req.body.Phone;
	console.log(xphone);
	booking.DeleteOneBookByPhone(xphone);

}



