var request = require('request');
var Light = require('../models/Light');

exports.getPhilipsLights = (req, res) => {
    var url = 'http://192.168.0.29/api/235f8s53RX9iq2tdL12sRNpSLJF-l3aFJG9tAM3W/lights';
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
                new Light(data[i]).save(function(err){
                    console.log(err);
                });
            }
            /*new Sensor(data['2']).save(function(err){
                console.log('OK');
                
                console.log(err);
            });*/
        }
    });
};