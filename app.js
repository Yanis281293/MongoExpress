const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//import des modèles
const User = require('./models/User');

const { initDB } = require('./config/database');

const app = express();

// Initialisation de la base de données
initDB();

// Configuration de la session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Initialisation de passport qui va nous permettre de gérer l'authentification
app.use(passport.initialize());//initialisation de passport
app.use(passport.session());//Sert à utiliser les sessions avec passport

// Utilisation de la stratégie locale de passport
passport.use(new LocalStrategy(User.authenticate()));

// Serialisation et deserialisation de l'utilisateur. C'est une étape obligatoire pour utiliser les sessions avec passport. C'est à dire que passport va lire les infos de session et les encoder/decoder
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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