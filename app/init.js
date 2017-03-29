"use strict";
module.exports = function () {
    var redisConfig = requireConfig('redis');
    // init kue
    var kue = require('kue-scheduler');
    var queue = kue.createQueue({
        redis: redisConfig.url,
        restore: true
    });

    queue.process('unique_every', function(job, done) {
    console.log('zob');
    done();
});
};