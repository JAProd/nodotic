"use strict";
// require wrapper ==============================================================
require('./app/require-wrapper');

// set up ======================================================================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var port = process.env.PORT || 8080;                // set the port (3000) test du commit depuis macif
var databaseConfig = require('./config/database.' + process.env.NODE_ENV);            // load the database config
var morgan = require('morgan');                         // log requests to the console (express4)
var bodyParser = require('body-parser');                // pull information from HTML POST (express4)
var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)
var passport = require('passport');

// init all mongoose models ====================================================
const fs = require('fs');
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// configuration ===============================================================
console.log("Starting app in " + process.env.NODE_ENV + ' mode.');
mongoose.connect(databaseConfig.url);                                 // connect to mongoDB database
mongoose.Promise = require('bluebird');                         // set Promise provider to bluebird

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));                                         // log every request to the console
}
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
require('./app/security/passport');
app.use(passport.initialize());

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
module.exports = app;
