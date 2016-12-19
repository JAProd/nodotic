var Sensor = require('../models/Sensor');
var philipsSensorController = require('./philipsSensor');

/**
 * GET /login
 * Login page.
 */
exports.getSensors = (req, res) => {
    console.log('coucou');
    Sensor.find({}, function(err, docs) {
        if (!err){ 
            res.send(docs);
        } else {
            throw err;
        }
    });
};

exports.getSensorTemperatureById = (req, res) => {
    philipsSensorController.getSensorTemperature(req, res);
}
