let book = require('./Data');
let booking = book.Book;

//module insert
module.exports.AddBook= (book,limit) =>{
	return new Promise(function(resolve,resject) {
		resolve(booking.create(book,limit));
		
	});
};



//module update Place by NumberPhone
module.exports.UdatePlaceByPhone = function(xphone,place){
	return new Promise(function(resolve,resject){
		let query = {Phone:xphone};
		let update = {

			Place:place
		}
		resolve(booking.update(query,update));
	});
};

//module update Amountf Peoole By Phone
module.exports.UdateAmountfPeopleByPhone= function(xphone,amountfpeople){
	return new Promise(function(resolve,resject){
		let query = {Phone:xphone};
		let update = {
			AmountfPeople:amountfpeople
		}
		resolve(booking.update(query,update));
	});
};



//module delete Booking
module.exports.DeleteOneBookByPhone= function(phone){
	return new Promise(function(resolve,resject){
		let query ={Phone:phone};
		resolve(booking.remove(query));
	});
};


