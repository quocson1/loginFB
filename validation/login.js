var passport = require('passport');
var jwt    = require('jsonwebtoken');
exports.checkLogin = function check(req,res,next){


    // Validationpassword
  req.checkBody('PassWord','password leght > 8 ki tu').notEmpty().isLength({min:8});
  req.checkBody('PassWord','password phải có 1 chữ in HOA và 1 SỐ').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{1,}$/, "i");
  req.checkBody('Phone','Phone Khong Hop Le').len(10,12).matches(/[0-9]/);
 // err
 var errors = req.validationErrors();
  if(errors){
     res.render('facebook',{
        errors:errors
      });
     
    }else{
      console.log('PASSED');
      next();
    } 
}

exports.checkSignup = function check(req,res,next){

  

    // Validation
  //req.checkBody('username','user name Contains invalid characters').matches(/^(?=.*[a-z])[0-9a-zA-Z]/, "i");
  req.checkBody('Ho',' Họ Không Hợp Lệ').matches(/^(?=.*[a-z])[0-9a-zA-Z]{3,}$/, "i");
  req.checkBody('Ten','Tên Không Hợp Lệ').matches(/^(?=.*[a-z])[0-9a-zA-Z]{2,}$/, "i");
  req.checkBody('PassWord','password Ít Nhất 8 Kí Tự').notEmpty().isLength({min:8});
  req.checkBody('PassWord','password Phải Có 1 Chữ in HOA Và 1 SỐ').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{1,}$/, "i");
  req.checkBody('Phone','Phone Khong Hop Le').len(10,12).matches(/[0-9]/);

  //req.checkBody('password','Passwords must have one capital letter and a number').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");
 // err
 var errors = req.validationErrors();
  if(errors){
      // var messages = [];
      // er.forEach(function(error){
      //   messages.push(error.msg);
      // });
      // //next error to user
      // next(messages);
      res.render('facebook',{
        errors:errors
      });
    } else{
      console.log('PASSED');
      next();
    }
    //secessful
    // next();  
}

exports.loggedIn=function loggedIn(req, res, next) {
    if (req.user) {
      console.log(req.query.Ho);
        next();
    } else {
        res.redirect('/');
    }
}

exports.token = function token(req, res,next) { 
  //res.redirect('/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZThiNWIxOWRmZmYzMmZmYzhiY2Q0MiIsImV4cCI6MTUwODUyNTgzOSwiaWF0IjoxNTA4NTIyMjM5fQ.OoAS9OOgCE5GkVuYS00ryjd413-qMAeRWW9TjLlghtQ');
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
     if (token) {

    // verifies secret and checks exp
    jwt.verify(token,'quocson' , function(err, decoded) {
      if (err) {
        //return req.flash('danger_msg' ,'lỗi token');    
        console.log("loi tooken");
      } else {
        
           //req.flash('user' ,decoded)
        // if everything is good, save to request for use in other routes
        req.decoded = decoded; 
       
        console.log(req.decoded);
        next();
      }
    });

  } else {
    res.render('facebook');
    // if there is no token
    // return an error
    // return res.status(403).send({ 
    //     success: false, 
    //     message: 'No token provided.'


    // });

  }
}

