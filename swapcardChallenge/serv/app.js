var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('stateless-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var channelsRouter = require('./routes/channels');
var messageRouter = require('./routes/message');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session.middleware());

app.get('/login',function(req,res){
  var mail = req.body.mail;
  var password = req.body.password;

  if(mail && password && validator.validate(mail)) {
    fctUser.login(mail, password)
    .then(token => {
      req.session.start();
      req.session.token = token;
      res.status(200).send('OK');
    })
    .catch( error => {
      res.status(500).send('Error : ' + error);
    });
  } else res.status(500).send("Parameters Missing");
});

app.get('/logout',function(req,res){
  req.session.stop();
  res.status(200).send("Logout done");
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/channels', channelsRouter);
app.use('/messages', messageRouter);



var fctUser = require('./functions/users');
var validator = require("email-validator");



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
