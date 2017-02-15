"use strict";
var passport = require('passport');
const userService = requireService('user');

module.exports.register = function (req, res) {
  userService.create(req.body).then(user => {
    res.status(201).json(user);
  }).catch(e => {
    res.status(409).json(e);
  });
};

module.exports.login = function (req, res) {
  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200).json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};