var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');

// var csrf = require('csurf');
// var csrfProtection = csrf();
// router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
var successMsg = req.flash('success')[0];
Product.find(function(err,docs){
  var productChunk = [];
  
  var chunkSize = 3;
  for(var i = 0; i < docs.length; i+= chunkSize){
    productChunk.push(docs.slice(i,i + chunkSize));
  }
  res.render('shop/index', { title: 'Shopping Cart', products: productChunk, suucessMsg: successMsg, noMessages: !successMsg});
});
 
});

router.get('/sort', function(req, res, next) {
  //var successMsg = req.flash('success')[0];
  var mysort = {price: -1};

  Product.find({}, function (err, docs) {


        if (err) {

            console.log("error query");

        } else {

            console.log('result>>'+docs);

        }
      var productChunk = [];

      var chunkSize = 3;
      for(var i = 0; i < docs.length; i+= chunkSize){
        productChunk.push(docs.slice(i,i + chunkSize));
      }
      res.render('shop/index', { title: 'Shopping Cart', products: productChunk});
    }).sort(mysort);
  
  });
  
router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {} );
  Product.findById(productId, function(err, product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});


router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice });
});

router.get('/reduce/:id' , function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {} );
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});
 router.get('/remove/:id' , function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {} );
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/checkout', function(req,res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', function(req, res, next){
  if(!req.session.cart){ 
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart); 

  var stripe = require("stripe")("sk_test_l58uYMMiUrFF2H0s1De2eIQY");

  stripe.charges.create({
  amount: cart.totalPrice * 100,
  currency: "usd",
  source: req.body.stripeToken, // obtained with Stripe.js
  description: "Test Charge"
}, function(err, charge) {
  if(err){
    req.flash('error', err.message);
    return res.redirect('/checkout');
  }
  req.flash('success', 'Successfully bought product');
  req.session.cart = null;
  res.redirect('/');
  
});
});
module.exports = router;
