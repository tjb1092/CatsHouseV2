var Product = require('../models/product');
var config = require('../config/database');

var mongoose = require('mongoose');
mongoose.connect(config.database);
//let db = mongoose.connection;


var products = [
  new Product({
    imagePath: '/public/images/lion.jpeg',
    title: 'Majestic Lion',
    price: 69
  }),
  new Product({
    imagePath: '/public/images/blackKitty.jpeg',
    title: 'Snowy Kit Kat',
    price: 69
  }),
  new Product({
    imagePath: '/public/images/chakchak.jpeg',
    title: 'Comrade Chak Chak',
    price: 69
  }),
  new Product({
    imagePath: '/public/images/derpCat.jpeg',
    title: 'This Derpy Cat',
    price: 69
  }),
  new Product({
    imagePath: '/public/images/orangeTabby.jpeg',
    title: 'Orange Tabby',
    price: 69
  }),
  new Product({
    imagePath: '/public/images/tabby.jpeg',
    title: 'Gray Tabby',
    price: 69
  })
];
console.log(products);
var done = 0;

for(var i=0; i<products.length; i++){
  products[i].save(function(err, result){
    done++;
    console.log(done);
    if(done === products.length){
      console.log('disconnecting');
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
