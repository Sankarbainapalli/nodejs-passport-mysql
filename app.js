var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expresshbs=require('express-handlebars');
var bodyParser=require('body-parser');
var expressValidator = require('express-validator');

var flash=require('connect-flash');
// var crypto     = require('crypto');

var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var connection=require('./config/database');
var session=require('express-session');

var indexRouter=require('./routes/index');
var usersRouter = require('./routes/users');

var mysql = require('mysql');
var app = express();




// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.engine('.hbs',expresshbs({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(expressValidator());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:'secret',resave:true,saveUninitialized:true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
 app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
