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

//router.get('/add-to-cart')
module.exports=router;
