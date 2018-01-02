const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('users', UserSchema);
