const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

UserSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}
UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

const User = module.exports = mongoose.model('users', UserSchema);
