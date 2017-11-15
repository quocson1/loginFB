const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const router = express.Router();
const validator = require('express-validator');
//const index = require('./routes/index') (router);
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const morgan = require('morgan');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
// Set Static Folder
const viewPath = path.join(__dirname, 'view');
//view ejs
app.set('views', viewPath);


app.engine('handlebars', require('exphbs').__express);
app.set('view engine', 'handlebars');
// Passport init
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));
//use body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());


app.use(cookieParser('secretString'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//use validator 
app.use(validator());
//exports 
require('./routes/user')(router);




// parse application/json
app.use(bodyParser.json())

//app.use('/',(router1));
require('./config/Passport.js')(passport);
app.use(function (err, req, res, next) {  
  res.status(500).send(err);
});
//error handing middleware
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.danger_msg = req.flash('danger_msg');
  console.log(req.flash('danger_msg'));
  next();
  
});

app.use('/', (router));
// use morgan to log requests to the console

//connect
const port = process.env.PORT || 3000;
//connect mongo
mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/data', function(err) {
    if (err) {
        console.log('connecting to mongodb failure!');
    }
    //start server
    var server = require("http").Server(app);
    var io = require("socket.io")(server);

    server.listen(port);
    console.log('dang lang nghe port ' + port);

    io.on('connection', function(socket) {
        console.log("co nguoi connect" + socket.id);
        socket.on("disconnect", function() {
            console.log(socket.id + "da ngat ket noi");
        })

        socket.on("rieng", function() {

        })
        
        socket.on("client-send", function(data) {

            console.log(socket.id + "gui " + data);
            io.sockets.emit("id", socket.id);
            io.sockets.emit("server-send", data);
        })

    });
 });











app.get("/facebook", (req, res) => {

    res.render("facebook");

});

// app.get("/socket", (req, res) => {

//     res.render("home");

// });
app.get('/p', function(req, res) {
    res.send("tagId is set to " + req.query.son);
    
});

app.get('/p/:tagId', function(req, res) {
    res.send("tagId is set to " + req.params.tagId);
});

app.post('/son',(req,res)=>{
  var a = req.body;
  res.send('xin chao')  ;
  console.log(a);
})
app.all('/er', function(req, res){
  req.flash('test', 'it worked');
  res.redirect('/test')
});
