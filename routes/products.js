const express = require('express');
const router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

router.get('/product/:id', function(req, res, next){
  Product.findById(req.params.id, function(err, product){
    if(err){
      console.log(err);
    } else {
      res.render('shop/product',{product:product});
    }
  });
});


router.post('/add-to-cart/:id', function(req, res, next){

  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});
  var qty = req.body.quantity;
  Product.findById(productID, function(err, product){
    if (err) {
      console.log(err);
      return res.redirect('back');
    }

    qty = Number(qty); // It's a string in the text box

    //Meh way of doing it, but it works.
    for (i = 0; i<qty; i++){
        cart.add(product, product.id);
    }

    req.session.cart = cart;
    //console.log(req.session.cart);
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

router.get('/checkout', function(req, res, next){
  if(!req.session.cart){
    return res.redirect('shop/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', {total: cart.totalPrice});
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
