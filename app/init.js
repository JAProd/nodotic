"use strict";
module.exports = function (app) {
    var redisConfig = requireConfig('redis');
    // init kue
    var kue = require('kue-scheduler');
    var queue = kue.createQueue({
        redis: redisConfig.url,
        restore: true
    });
};