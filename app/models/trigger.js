"use strict";
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var triggerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    uppercase : true
  },
  lastTriggered: {
    type: Date,
    default: Date.now 
  },
  events: [String],
  //TODO créer une regex quand la forme des conditions sera définie
  condition: String,
});

triggerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Trigger', triggerSchema);