"use strict";
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var eventSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    uppercase : true
  },
  lastFired: {
    type: Date,
    default: Date.now 
  }
});

eventSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Event', eventSchema);