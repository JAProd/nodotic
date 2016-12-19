"use strict";
const AbstractService = require('./abstract');
var mongoose = require('mongoose'); 
var User = mongoose.model('User');
class UserService extends AbstractService {

    /**
     * creates a user and persists it into the database
     * 
     * @this {UserService}
     * @returns {User} the persisted user
     */
    create(userInfos) {
        //check if the email is already taken
        var userExists = User.count({'email' : userInfos.name}, function(err, nb) {
            return !!nb;
        });
        if (userExists) {
            return Error('email already taken');
        }

        //fill the user object
        var user = new User();
        user.name = userInfos.name;
        user.email = userInfos.email;
        user.password = userInfos.password;

        //persist the user
        var errors = user.save(function(err) {
            return err;
        });
        if (errors) {
            return new Error('Invalid data given');
        }
        return user;
    }
}

module.exports = UserService;