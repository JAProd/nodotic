"use strict";
const UserService = require('../services/user');

module.exports.getUserById = function (req, res) {
    UserService.findById(req.params.userId).then(user => {
        res.status(200).json(user);
    });
}