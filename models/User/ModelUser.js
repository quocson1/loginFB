var bcrypt =require('bcryptjs');
const ac = require('./Data.js');
var Acount = ac.acount;
//create UserName

module.exports ={
// 	createUser(newUser,callback){
// 	bcrypt.genSalt(10,function(err,salt){
// 		bcrypt.hash(newUser.PassWord,salt,function(err,hash){
// 			newUser.PassWord = hash;
// 			newUser.save(callback);
// 		});
// 	});
// },


	 createUser: (newUser)=>{
	 	return new Promise((resolve,reject)=>{
	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(newUser.PassWord,salt,function(err,hash){
			newUser.PassWord = hash;
			return resolve(newUser.save());
			//newUser.save(callback);
		});
	});
		});
},

//use acount in data


//get User by UserName
// getUserByUsername (username,callback){
//   var query ={Phone: username};

//   Acount.findOne(query,callback);
// },
getUser:()=>{

	try{

		return Promise.resolve (Acount.find({}));
	}catch(err){
		return Promise.reject (err);
	}

},

getUserByUsername:(username)=>{
	return new Promise((resolve,reject)=>{
  var query ={Phone: username};
  if(!query){
  	return reject(new Error("sai so phone"));
  }
  
  return resolve(Acount.findOne(query));
  })
},

//decryption compare password present vs password BD 
comparePassword:(candidatePassword,hash,callback)=>{
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null,isMatch);
});
},
//get User by ID
getUserById:(id,callback)=>{
  Acount.findById(id,callback);
}

};



