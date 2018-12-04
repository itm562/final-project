var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');
var csrf = require('csurf');
var csrfProtection = csrf();

router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next){
  var email = req.user.email;
  var isAdmin = req.user.isAdmin;
  console.log('isAdmin'+isAdmin);
  if(isAdmin){
    console.log('inside if');
    var successMsg = req.flash('success')[0];
    Product.find(function(err,docs){
    var productChunk = [];
    
    var chunkSize = 3;
    for(var i = 0; i < docs.length; i+= chunkSize){
      productChunk.push(docs.slice(i,i + chunkSize));
    }
    res.render('user/admin', { title: 'Shopping Cart', products: productChunk, suucessMsg: successMsg, noMessages: !successMsg});
  });
  }else{
    console.log('inside else');
    res.redirect('/');
  } 

 
});

router.get('/delete/:id' ,isLoggedIn,  function(req, res, next){
  var productId = req.params.id;
  var item =  Product.findOne({"_id" : ObjectId(productId)});
  Product.remove({_id: item._id});
  res.render('user/profile');
});
router.get('/logout', isLoggedIn, function(req, res, next){
  req.logOut();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
  next();
});
/* GET users listing. */
router.get('/signup',function(req,res,next){
  var messages = req.flash('error');
  res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages , hasErrors: messages.length > 0 });

});

router.post('/signup',passport.authenticate('local.signup',{
  //successRedirect: '/user/profile',
  successRedirect: '/',
  failureRedirect: '/user/signup',
  failureFlash: true
}));


router.get('/signin',function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages , hasErrors: messages.length > 0 });

});

router.post('/signin',passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  //successRedirect: '/',
  failureRedirect: '/user/signin',
  failureFlash: true
})
);


module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};