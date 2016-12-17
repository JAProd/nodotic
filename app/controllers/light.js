var Light = require('../models/Light');

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
 * GET /lights/name
 * Login page.
 */
exports.getLightsById = (req, res) => {
    console.log(req);
    var id = req.params.id;
    console.log(id);
    Light.find({}, function(err, docs) {
        if (!err){ 
            res.send(docs);
        } else {
            throw err;
        }
    });
};

