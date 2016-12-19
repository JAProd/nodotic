var Light = require('../models/Light');
var philipsLightController = require('./philipsLight');

/**
 * GET /login
 * Login page.
 */
exports.getLights = (req, res) => {
    Light.find({}, function(err, docs) {
        if (!err){ 
            res.send(docs);
        } else {
            throw err;
        }
    });
};

/**
 * GET /lights/id
 * Login page.
 */
exports.getLightsById = (req, res) => {
    console.log(req.params);
    var id = req.params.light_id;
    Light.find({'id':id}, function(err, docs) {
        if (!err){ 
            res.send(docs);
        } else {
            throw err;
        }
    });
};

/**
 * GET /lights/active
 */
exports.getActiveLights = (req, res) => {
    philipsLightController.getActivePhilipsLights(req, res);
};

exports.activeLightById = (req, res) => {
    var id = req.params.light_id;
    philipsLightController.activePhilipsLightById(req, res, id);
}

exports.disableLightById = (req, res) => {
    var id = req.params.light_id;
    philipsLightController.disablePhilipsLightById(req, res, id);
}

exports.changePhilipsColorLightById = (req, res) => {
    var id = req.params.light_id;
    var r = req.query.r;
    var g = req.query.g;
    var b = req.query.b;

    philipsLightController.changePhilipsColorLightById(req, res, id, r, g, b);
    
}