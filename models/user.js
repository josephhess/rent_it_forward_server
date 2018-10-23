'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String,required: true},
  lastName: {type: String, required: true},
  zipCode: {type: String, required: true}
});

UserSchema.methods.serialize = function() {
  return {
    id: this.id || '',
    email: this.email || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    zipCode: this.zipCode || ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
  
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

UserSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = {User};

