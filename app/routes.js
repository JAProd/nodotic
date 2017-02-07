var securityConfig = require('../config/security.' + process.env.NODE_ENV);
var cron = require('cron');
var jwt = require('express-jwt');
var auth = jwt({
  secret: securityConfig.passwordSalt,
  userProperty: 'payload'
});
var sensorController = require('./controllers/sensor');
var lightController = require('./controllers/light');
var userController = require('./controllers/user');

var authenticationController = require('./controllers/authentication');

module.exports = function(app) {
    app.get('/api/lights', lightController.getLights);
    app.get('/api/lights/active', lightController.getActiveLights);
    app.get('/api/lights/:light_id', lightController.getLightsById);
    app.post('/api/lights/active/:light_id', lightController.activeLightById);
    app.post('/api/lights/disable/:light_id', lightController.disableLightById);
    app.post('/api/lights/changecolor/:light_id', lightController.changePhilipsColorLightById);
    app.get('/api/sensors', auth, sensorController.getSensors);
    app.get('/api/sensor/temperature', sensorController.getSensorTemperatureById);
    //authentication
    app.post('/register', authenticationController.register);
    app.post('/login', authenticationController.login);

    //user controller
    app.get('/user/:userId', auth, userController.getUserById);
    app.get('/user/me')

    app.post('/api/sensors', function(req, res) {
    });
    app.delete('/api/sensors/:sensor_id', function(req, res) {
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile('../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};