var mongoose = require('mongoose');

var stateLight = mongoose.Schema({
    active: Boolean,
    bri: Number,
    hue: Number,
    sat: Number,
    xy: [],
    ct: Number,
    alert: String,
    effect: String,
    colormode: String,
    reachable: Boolean
});

var lightSchema = mongoose.Schema({
    id: String,
    type : String,
    name : String,
    modelid: String,
    manufacturename : String,
    uniqueid: String,
    swversion : String,
    swconfigid: String,
    productid: String,
    date: Date,
    old: Boolean,
    state: stateLight
});

module.exports = mongoose.model('Light', lightSchema);