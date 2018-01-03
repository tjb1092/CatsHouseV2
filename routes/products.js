const express = require('express');
const router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

router.get('/add-to-cart/:id', function(req, res, next){

  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});

  Product.findById(productID, function(err, product){
    if (err) {
      console.log(err);
      return res.redirect('back');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('back');
  });
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/*', function(req,res){
  Product.find(function(err, docs){
    if(err){
      console.log(err);
    } else {
      res.render('shop/products',{
        title: req.path,
        products: docs
      });
    }
  });

});


module.exports=router;
