var philipsSensorController = require('../controllers/philipsSensor');
var philipsLightController = require('../controllers/philipsLight');

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '* */5 * * * *',
  onTick: function() {
      philipsSensorController.getPhilipsSensors();
      philipsLightController.getPhilipsLights();
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
//job.start();