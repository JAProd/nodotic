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

module.exports = mongoose.model('Light', {
    type : String,
    name : String,
    modelid: String,
    manufacturename : String,
    uniqueid: String,
    swversion : String,
    swconfigid: String,
    productid: String,
    state: stateLight
});