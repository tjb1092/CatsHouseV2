var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Product = module.exports = mongoose.model('products', productSchema);
