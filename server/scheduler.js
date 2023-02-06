// const schedule = require('node-schedule');
// const moment = require('moment');
// const deviceController = require('./controllers/device.controller');

// schedule.scheduleJob('*/30 * * * *', function() {
//   console.log(`Device Cron run at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
//   deviceController.cronBaseChangeStatus();
// });

// schedule.scheduleJob('0 0 * * *', function() {
//   console.log(
//     `Validate Devices  run at ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
//   );
//   deviceController.cronValidateDevices();
// });
