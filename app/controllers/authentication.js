var mongoose = require('mongoose'); 
var User = mongoose.model('User');
var passport = require('passport');
const UserService = require('../services/user');

module.exports.register = function(req, res) {
  //var user = new User();
  var userService = new UserService();
  var user = userService.create(req.body);
  if (user instanceof Error) {
    res.status(400);
    res.json({'error' : user.message})
  } else {
    res.status(201);
    res.json(user);
  }
  
  /*user.save(function(err) {
    console.log(err);
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });*/
};

module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};