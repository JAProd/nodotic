var mongoose = require('mongoose');

var configSensor = mongoose.Schema({
    reachable: Boolean,
    configured: Boolean,
    sunriseoffset: Number,
    sunsetoffset: Number, 
    battery: Number,
    reachable: Boolean,
    alert: String,
    ledindication: Boolean,
    usertest: Boolean,
    pending: [],
    sensitivity: Number,
    sensitivitymax: Number,
    tholddark: Number,
    tholdoffset: Number
});

var stateSensor = mongoose.Schema({
    status: Number,
    temperature: Number,
    presence: Boolean,
    lightlevel: Number,
    dark: Boolean,
    daylight: Boolean,
    lastupdated: Date
});

module.exports = mongoose.model('Sensor', {
    id: String,
    name : String,
    type : String,
    modelid: String,
    manufacturename : String,
    swversion : String,
    config: configSensor,
    state: stateSensor
});