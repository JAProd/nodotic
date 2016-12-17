var request = require('request');
var Sensor = require('../models/Sensor');

exports.getPhilipsSensors = (req, res) => {
    var url = 'http://192.168.0.29/api/235f8s53RX9iq2tdL12sRNpSLJF-l3aFJG9tAM3W/sensors';
    var jsonRes = 
    request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
        console.log('Error:', err);
        } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
        } else {
            for (var i in data) {
                var sensor = new Sensor(data[i]);
                sensor.id = i;
                sensor.save(function(err){
                    //console.log(err);
                });
            }
        }
    });
};

exports.getSensorTemperature = (req, res) => {
    var url = 'http://192.168.0.29/api/235f8s53RX9iq2tdL12sRNpSLJF-l3aFJG9tAM3W/sensors' ;
    
   var jsonRes = 
    request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
    }, (err, result, data) => {
        if (err) {
        console.log('Error:', err);
        } else if (result.statusCode !== 200) {
        console.log('Status:', result.statusCode);
        } else {
            for (var i in data) {
                var sensor = new Sensor(data[i]);
                
                if (sensor.type == 'ZLLTemperature') {
                    var temp = sensor.state.temperature;

                    temp = temp / 100;

                    res.send("Il fait " + temp + " degrés !!");
                }

            }
        }
    });

}