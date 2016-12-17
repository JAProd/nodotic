var securityConfig = require('../config/security');
var cron = require('./util/cron');
var jwt = require('express-jwt');
var auth = jwt({
  secret: securityConfig.passwordSalt,
  userProperty: 'payload'
});
var sensorController = require('./controllers/sensor');
var lightController = require('./controllers/light');

var authenticationController = require('./controllers/authentication');

module.exports = function(app) {
    app.get('/api/lights', lightController.getLights);
    app.get('/api/lights/:light_id', lightController.getLightsById);
    app.get('/api/sensors', sensorController.getSensors);
    //authentication
    app.post('/register', authenticationController.register);
    app.post('/login', authenticationController.login);


    app.post('/api/sensors', function(req, res) {
    });
    app.delete('/api/sensors/:sensor_id', function(req, res) {
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile('../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};