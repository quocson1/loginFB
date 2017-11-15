var UserController = require('../controller/UserController');
var validationLogin = require('../validation/login');
const express = require('express');
module.exports = function(router){

//view HomePage
//router.get('/',UserController.HomePage);

router.get('/',validationLogin.token,UserController.SocKet);
router.get('/socket', validationLogin.loggedIn ,UserController.SocKet);
//router.get('/socket',UserController.SocKet);
//post signup
router.post('/signup',validationLogin.checkSignup,UserController.Signup);

//check login if (true) => login , else faile :)

router.route('/login')
	.get(UserController.getLogin)
	.post(validationLogin.checkLogin,UserController.Login);

//Route Middleware to Protect API Routes token
router.get('/token',UserController.CheckToken,UserController.SocKet);
//logout
router.get('/Logout',UserController.Logout);


router.get('/user',UserController.getUser);

};







