var passport = require('passport');
var Acount = require('../models/User/ModelUser');

var acount = require('../models/User/Data');
var jwt    = require('jsonwebtoken');
//display HomePage
exports.HomePage = function(req,res){
    
    //res.send('xin chao hi hi');
    // var a = {danger_msg:req.flash('danger_msg')};
    // console.log(a);
    
     res.render("facebook");
     
}


exports.SocKet= function(req,res){
     res.render("home");
     
     
}
exports.getLogin = (req,res)=>{
    
    res.send('sai ten dang nhap vui long nhap lai ');
}

exports.getUser = (req,res)=>{
    
    Acount.getUser().then(dataUser =>{
      res.send(dataUser);
    })
    .catch(err=> next(err)
    );
}

       
//Handle Genre login
// exports.Login = passport.authenticate('local', {successRedirect:'/', failureRedirect: '/',
//     failureFlash:true });
	
exports.Login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    // Redirect if it fails
    if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
      //console.log(user);
      return res.redirect('/socket?Ho='+user.Ho);
    });
  })(req, res, next);
}
//DisPlay Logout
exports.Logout = function(req,res){
	res.send('see you again :)');
}

//Handle Genre SignUp
exports.Signup = function(req,res) {
  console.log(req.body.gender);
    Acount.getUserByUsername(req.body.Phone).then(user =>{
      // ,function(err,user){
     // if(err) throw err;
      if(!user){
        //   const acountNew = new acount.acount(req.body);
    
        // Acount.createUser(acountNew,function(err,user){
        //     if(err) throw err;
        //      req.flash('success_msg' ,'Đăng Ký Thành Công');
        //      res.redirect('/');         
        // })
        const acountNew = new acount.acount(req.body);
    
        Acount.createUser(acountNew).then(user =>{

          req.flash('success_msg' ,'Đăng Ký Thành Công'),
          // console.log(user),
             res.redirect('/')  });
                    
        
      
      }
      
      if(user){
        
        req.flash('danger_msg' ,'Tài Khoản Đã Tồn Tại');
        res.redirect('/'); 
                  
      }
 }).catch(err => console.log(err))
    // })      
}


exports.CheckToken = function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
     if (token) {

    // verifies secret and checks exp
    jwt.verify(token,'quocson' ,function(err, decoded) {
         
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        
           req.flash('user' ,decoded)
        // if everything is good, save to request for use in other routes
        req.decoded = decoded; 
        console.log("day day"+req.cookies.token);  
        console.log(req.decoded);
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }

}












