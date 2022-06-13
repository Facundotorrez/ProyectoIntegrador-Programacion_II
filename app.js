var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products'); //aca requiero el archivo de routes (products.js)
const db = require('./database/models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// inicio de las rutas de nuestro proyecto (prefijos)
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productsRouter); //declaro la ruta a utilizar

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//session
app.use(session({
  secret: "librosdb",
  resave: false,
  saveUninitialized: true,
}));

//pasar los datos de session a local
app.use(function(req, res, next){
  if(req.cookies.userId != undefined && req.session.user == undefined){
    let userId = req.cookies.userId;
    //pregunto en la db
    users.findByPk(userId)
    .then(function(user){
      req.session.user = user.dataValues
      res.locals.user = user.dataValues
      return next();
    })
    .catch(error => console.log(error))
  } else {
    return next();
  }
})

//cookies
app.use(function(req,res,next){
  if(req.cookies.userId && !req.session.user){
    db.Usuario.findByPk(req.cookies)
  }
})

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