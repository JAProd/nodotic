var securityConfig = require('../config/security');
var jwt = require('express-jwt');
var auth = jwt({
  secret: securityConfig.passwordSalt,
  userProperty: 'payload'
});

var authenticationController = require('./controllers/authentication');

module.exports = function(app) {

    //authentication
    app.post('/register', authenticationController.register);
    app.post('/login', authenticationController.login);

    //sensors
    app.get('/api/sensors', auth, function(req, res) {
        return res.send('bordel');
    });
    app.post('/api/sensors', function(req, res) {
    });
    app.delete('/api/sensors/:sensor_id', function(req, res) {
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile('../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};