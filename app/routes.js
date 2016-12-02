var sensor = require('./models/sensor');

module.exports = function(app) {
    app.get('/api/sensors', function(req, res) {
    });
    app.post('/api/sensors', function(req, res) {
    });
    app.delete('/api/sensors/:sensor_id', function(req, res) {
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};