var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

// Signup Process
passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){

    email = req.body.email;
    password = req.body.password;
    password2 = req.body.password2;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be longer than four characters').isLength({min:4});
    req.checkBody('password2', 'Passwords do not match').equals(password);

    let errors = req.validationErrors();

    if(errors){
      var messages = [];
      errors.forEach(function(error){
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    } else {
      User.findOne({'email': email}, function(err, user){
        if(err){
          return done(err);
        }
      if(user){
        return done(null, false, {message: 'Email is already in use.'});
      }
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.save(function(err, result){
        if(err){
          return done(err);
        } else {
          return done(null, newUser);
        }
      });
    })
}}));


// Log In Process
passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){

    email = req.body.email;
    password = req.body.password;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    let errors = req.validationErrors();

    if(errors){
      var messages = [];
      errors.forEach(function(error){
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    } else {
      User.findOne({'email': email}, function(err, user){
        if(err){
          return done(err);
        }
      if(!user){
        return done(null, false, {message: 'No user found.'});
      }
      if(!user.validPassword(password)){
        return done(null, false, {message: 'Wrong password.'});
      }
      return done(null, user);
    });
}}));
