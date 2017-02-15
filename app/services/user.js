"use strict";
const AbstractService = requireService('abstract');
var mongoose = require('mongoose');
var User = mongoose.model('User');
class UserService extends AbstractService {

    /**
     * creates a user and persists it into the database
     * 
     * @this {UserService}
     * @param {Object} userInfos informations to build the user from
     * @param {String} userInfos.name user's name
     * @param {String} userInfos.email user's email
     * @param {String} userInfos.password user's password
     * @returns {Promise} the persisted user
     */
    create(userInfos) {
        var user = new User();
        user.name = userInfos.name;
        user.email = userInfos.email;
        user.password = userInfos.password;
        return user.save();
    }

    findById(userId) {
        return User.findById(userId).exec();
    }
}

module.exports = new UserService();