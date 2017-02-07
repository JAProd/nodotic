"use strict";
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');
var securityConfig = require('../../config/security.' + process.env.NODE_ENV);

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  salt: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true,

  }
}, {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.passwordHash;
        delete ret.salt;
      }
    }
  });

userSchema.plugin(uniqueValidator);

userSchema.virtual('password')
  .get(function () {
    return this._password;
  })
  .set(function (value) {
    if (value) {
      this._password = value;
      this.salt = crypto.randomBytes(16).toString('hex');
      this.passwordHash = crypto.pbkdf2Sync(this._password, this.salt, 1000, 64, 'sha256').toString('hex');
    }
  });

userSchema.path('passwordHash').validate(function () {
  if (this._password && this._password.length < securityConfig.passwordMinSize) {
    this.invalidate('password', '`{PATH}` must be at least ' + securityConfig.passwordMinSize + ' characters.', this._password, "minlength");
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', '`{PATH}` is required.', "", "required");
  }
}, null);

userSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
  return this.passwordHash === hash;
};

userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, securityConfig.passwordSalt);
};

module.exports = mongoose.model('User', userSchema);