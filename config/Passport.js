const LocalStrategy = require('passport-local').Strategy;
var Acount = require('../models/User/ModelUser');
var bcrypt =require('bcryptjs');
var jwt    = require('jsonwebtoken');

module.exports = function(passport){



//decode password
passport.use(new LocalStrategy({
  //phone  password body 
  usernameField: 'Phone',
  passwordField: 'PassWord',
  passReqToCallback: true
},function(req,Phone, PassWord, done) {
    //get User by UserName
    Acount.getUserByUsername(Phone).then((user)=>{
      //,function(err,user){

      // if(err) throw err;
      if(!user){

        return done(null,false,req.flash('danger_msg' ,'Tài Khoản Không Tồn Tại'));
      }
      
      //compare pass now and password DB
      Acount.comparePassword(PassWord,user.PassWord,function(err,isMatch){
        if(err)  throw err;
        //neu thanh cong
        if(isMatch){

          console.log(user.id);
         // create a token with only our given payload ,Signing a token with 1 hour of expiration:
          var token = jwt.sign({id: user.id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)},'quocson');

          var jsonToken = {
            token: token,
            success: true
          } 
          console.log(jsonToken);
          //send messenger to user id

          return done(null,user,req.flash('success_msg' ,'Đăng Nhập Thành Công'));
        }else{
          return done(null,false,req.flash('danger_msg' ,'Tài Khoản Không Tồn Tại'));
        }
      });
}).catch(err=> console.log(err))
  // });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Acount.getUserById (id, function(err, user) {
    done(err, user);
  });
});
//module.exports.getUserByUsername = getUserByUsername;
}



