var Sensor = require('../models/Sensor');

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
