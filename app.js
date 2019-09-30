var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
// env variables
require('dotenv').config();
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var tryoutRouter = require('./routes/tryout');
var usersRouter = require('./routes/users');
var podoscopeRouter = require('./routes/podoscopeEntry');

var app = express();

//increase file limit size for images
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'podoscope-ui/build')));



app.use('/hello', indexRouter);
app.use('/tryout', tryoutRouter);
app.use('/users', usersRouter);
app.use('/podoscope', podoscopeRouter);

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
  res.send('error');
});

module.exports = app;
