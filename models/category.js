var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
});

const Category = module.exports = mongoose.model('categories', categorySchema);
