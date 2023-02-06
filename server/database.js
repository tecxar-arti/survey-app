const mongoose = require('mongoose');
const config = require('./config/config');
const { userService } = require('./services');
const logger = require('./config/logger');

// set mongoose Promise to Bluebird
mongoose.Promise = require('bluebird');

// print mongoose logs in dev env
if (config.env === 'development') {
  mongoose.set('debug', false);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = (uri, options) => mongoose.connect(uri, options);

exports.setupDefaults = () =>
  new Promise((resolve, reject) => {
    logger.info(`Setting up application defaults`);
    userService
      .getUserByEmail('Arti')
      .then(user => {
        logger.info(`Admin user found`);
        resolve();
      })
      .catch(() => {
        logger.info(`Admin user not found, adding user`);
        resolve();
      });
  });
