var createError = require('http-errors');
var favicon = require('serve-favicon');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var util = require('util');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(expressValidator());
app.use(expressSession({resave:false, saveUninitialized:false, secret: '1#9n*2nwq'}));

app.use(function(req, res, next) {
  console.log("App level middleware");
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/query/:id', (req, res) => {
  req.checkBody('postparam', 'Invalid post param').notEmpty().isInt();
  req.checkParams('urlparam', 'Invalid urlparam').isAlpha();
  req.checkQuery('getparam', 'Invalid get param').isInt();
  req.sanitizeBody('postparam', 'Invalid post param').toBoolean();
  req.sanitizeParams('urlparam', 'Invalid post param').toBoolean();
  req.sanitizeQuery('getparam', 'Invalid post param').toBoolean();
  // or find the relevant param in all areas
  req.sanitize('postparam').toBoolean();
  var errors = req.validationErrors();
  if(errors) {
    res.status(util.inspect(errors), 400).send('\nValidation errors\n');
    return;
  }
  res.json({
    urlParam: req.params.urlparam,
    getParam: req.params.getparam,
    postParam: req.params.postparam
  });
});
app.get('/name/:username', function(req, res) {
  req.session.name = req.params.username;
  res.send('<a href="/username">View Session</a>')
})

app.get('/username', function(req, res) {
  if (req.session.name) {
    res.send('This is the stored session info ' + req.session.name + '<br/><a href="/logout">Logout</a>');
  } else {
    res.send('Already logged out');
  }
})
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.send("Logged out successfully session destroyed<br /><a href='/username'>check session</a>");
});
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
