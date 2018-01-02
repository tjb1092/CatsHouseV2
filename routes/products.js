const express=require('express');
const router=express.Router();

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
router.get('/living_room', function(req,res){
  res.render('shop/products',{
    title: 'Living Room'
  });
});
router.get('/human_quarters', function(req,res){
  res.render('shop/products',{
    title: 'Human\'s Quarters'
  });
});

module.exports=router;
