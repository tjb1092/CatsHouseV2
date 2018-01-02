const express = require('express');
const router = express.Router();
var Product = require('../models/product');

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
router.get('/bathroom', function(req,res){
  res.render('shop/products',{
    title: 'Bathroom'
  });
});
router.get('/closet', function(req,res){
  res.render('shop/products',{
    title: 'Closet'
  });
});
router.get('/kitchen', function(req,res){
  res.render('shop/products',{
    title: 'Kitchen'
  });
});
router.get('/bedroom', function(req,res){
  res.render('shop/products',{
    title: 'Bedroom'
  });
});

router.get('/human_quarters', function(req,res){
  res.render('shop/products',{
    title: 'Human\'s Quarters'
  });
});

module.exports=router;
