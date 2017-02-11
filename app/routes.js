var securityConfig = require('../config/security.' + process.env.NODE_ENV);
var cron = require('cron');
var jwt = require('express-jwt');
var auth = jwt({
  secret: securityConfig.passwordSalt,
  userProperty: 'payload'
});
var userController = require('./controllers/user');

var authenticationController = require('./controllers/authentication');

module.exports = function(app) {
    //authentication
    app.post('/register', authenticationController.register);
    app.post('/login', authenticationController.login);

    //user controller
    app.get('/user/me', auth, userController.getMe)
    app.get('/user/:userId', auth, userController.getUserById);

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile('../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};