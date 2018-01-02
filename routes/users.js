var express = require('express');
var passport = require('passport');
var router = express.Router();
var csrf = require('csurf');
require('../config/passport');
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next){
  res.render('user/profile')
});


router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/'); //Want to probably redirect to the previous page ideally.
});

router.use('/', isnotLoggedIn, function(req, res, next){
  next();
});

router.get('/signup',function(req,res, next){
  var messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});


router.post('/signup',logSignup,passport.authenticate('local.signup', {
    successRedirect:  'profile',
    failureRedirect: 'signup',
    failureFlash: true
}));

function logSignup(req,res, next){
  console.log("POST request recieved");
  console.log(req.body);
  next();
}

router.get('/login',function(req,res,next){
  var messages = req.flash('error');
  res.render('user/login', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});
router.post('/login',logSignup,passport.authenticate('local.login', {
    successRedirect:  'profile',
    failureRedirect: 'login',
    failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function isnotLoggedIn(req, res, next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
