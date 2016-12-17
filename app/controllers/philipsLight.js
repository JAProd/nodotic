var request = require('request');
var Light = require('../models/Light');
var lightUtil = require('../util/light');
var url = 'http://192.168.0.29/api/235f8s53RX9iq2tdL12sRNpSLJF-l3aFJG9tAM3W/lights';

exports.getPhilipsLights = (req, res) => {
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
                var light = new Light(data[i]);
                light.id = i;
                light.old = false;
                light.state.active = data[i].state.on;
                light.date = new Date();
                light.save(function(err){
                    //console.log(err);
                });

                /*Light.find({ id: i }, function (err, previousLights){
                    for (var index in previousLights) {
                        if (null != previousLights[index] && previousLights[index]._id != light._id) {
                            previousLights[index].old = true;
                            previousLights[index].save();
                        }
                    }
                    
                });*/

            }
            /*new Sensor(data['2']).save(function(err){
                console.log('OK');
                
                console.log(err);
            });*/
        }
    });
};

exports.getActivePhilipsLights = (req, res) => {
    
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
                var array = new Array;
                for (var i in data) {
                    if (data[i].state.reachable == true) {
                        if (data[i].state.on == true) {
                            array.push(data[i]);
                        }
                    }
                }
                res.send(array);
            //console.log(data);
        }
    });
};

exports.activePhilipsLightById = (req, res, id) => {
    var url = 'http://192.168.0.29/api/235f8s53RX9iq2tdL12sRNpSLJF-l3aFJG9tAM3W/lights/' + id + '/state';
    console.log(url);
    var myJSONObject = { 'on': true };
    request({
        url: url,
        method: "PUT",
        json: true,   // <--Very important!!!
        body: myJSONObject,
        headers: {
            myJSONObject
        }
    }, function (error, response, body){
        console.log(body);
    });

    res.send('Lampe allumée');
}

exports.disablePhilipsLightById = (req, res, id) => {
    var url = 'http://192.168.0.29/api/235f8s53RX9iq2tdL12sRNpSLJF-l3aFJG9tAM3W/lights/' + id + '/state';
    console.log(url);
    var myJSONObject = { 'on': false };
    request({
        url: url,
        method: "PUT",
        json: true,   // <--Very important!!!
        body: myJSONObject,
        headers: {
            myJSONObject
        }
    }, function (error, response, body){
        console.log(body);
    });

    res.send('Lampe etteinte');
}

exports.changePhilipsColorLightById = (req, res, id, r, g, b) => {
    
    var xy = lightUtil.toXY(r, g, b);

    var url = 'http://192.168.0.29/api/235f8s53RX9iq2tdL12sRNpSLJF-l3aFJG9tAM3W/lights/' + id + '/state';
    
    var myJSONObject = { 'on': true,  "xy":xy};
    request({
        url: url,
        method: "PUT",
        json: true,   // <--Very important!!!
        body: myJSONObject,
        headers: {
            myJSONObject
        }
    }, function (error, response, body){
        console.log(body);
    });

    res.send('Couleur changée');
}